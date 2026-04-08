import puter from "@heyputer/puter.js";
import {getOrCreateHostingConfig, uploadImageToHosting} from "./puter.hosting";
import {isHostedUrl} from "./utils";
import {PUTER_WORKER_URL} from "./constants";

export const signIn = async () => await puter.auth.signIn();

export const signOut = () => puter.auth.signOut();

export const getCurrentUser = async () => {
    try {
        return await puter.auth.getUser();
    } catch {
        return null;
    }
}

export const createProject = async ({ item, visibility = "private" }: CreateProjectParams): Promise<DesignItem | null | undefined> => {
    const projectId = item.id;

    const hosting = await getOrCreateHostingConfig();

    const hostedSource = projectId ?
        await uploadImageToHosting({ hosting, url: item.sourceImage, projectId, label: 'source', }) : null;

    const hostedRender = projectId && item.renderedImage ?
        await uploadImageToHosting({ hosting, url: item.renderedImage, projectId, label: 'rendered', }) : null;

    const resolvedSource = hostedSource?.url || (isHostedUrl(item.sourceImage)
        ? item.sourceImage
        : ''
    );

    if(!resolvedSource) {
        console.warn('Failed to host source image, skipping save.')
        return null;
    }

    const resolvedRender = hostedRender?.url
        ? hostedRender?.url
        : item.renderedImage && isHostedUrl(item.renderedImage)
            ? item.renderedImage
            : undefined;

    const {
        sourcePath: _sourcePath,
        renderedPath: _renderedPath,
        publicPath: _publicPath,
        ...rest
    } = item;

    const payload = {
        ...rest,
        sourceImage: resolvedSource,
        renderedImage: resolvedRender,
    }

    try {
        if (!PUTER_WORKER_URL) {
            console.info('Using puter.kv as fallback for saving project');
            await puter.kv.set(`project_${projectId}`, payload);
            
            const listObj = await puter.kv.get('project_ids');
            let list: string[] = [];
            
            if (Array.isArray(listObj)) {
                list = listObj;
            } else if (typeof listObj === 'string') {
                try { list = JSON.parse(listObj); } catch { list = []; }
            }

            if (!list.includes(projectId)) {
                list.push(projectId);
                await puter.kv.set('project_ids', list);
            }
            return payload;
        }

        const response = await puter.workers.exec(`${PUTER_WORKER_URL}/api/projects/save`, {
            method: 'POST',
            body: JSON.stringify({
                project: payload,
                visibility
            })
        });

        if(!response.ok) {
            console.error('failed to save the project', await response.text());
            return null;
        }

        const data = (await response.json()) as { project?: DesignItem | null }

        return data?.project ?? null;
    } catch (e) {
        console.log('Failed to save project', e)
        return null;
    }
}

export const getProjects = async () => {
    if(!PUTER_WORKER_URL) {
        console.info('Using puter.kv as fallback for getProjects');
        try {
            const listObj = await puter.kv.get('project_ids');
            let list: string[] = [];
            
            if (Array.isArray(listObj)) {
                list = listObj;
            } else if (typeof listObj === 'string') {
                try { list = JSON.parse(listObj); } catch { list = []; }
            }
            
            const projs: DesignItem[] = [];
            for (const id of list) {
                const item = await puter.kv.get(`project_${id}`) as DesignItem | null;
                if (item) projs.push(item);
            }
            return projs.sort((a,b) => b.timestamp - a.timestamp);
        } catch (e) {
            console.error('Failed to get KV projects', e);
            return [];
        }
    }

    try {
        const response = await puter.workers.exec(`${PUTER_WORKER_URL}/api/projects/list`, { method: 'GET' });

        if(!response.ok) {
            console.error('Failed to fetch history', await response.text());
            return [];
        }

        const data = (await response.json()) as { projects?: DesignItem[] | null };

        return Array.isArray(data?.projects) ? data?.projects : [];
    } catch (e) {
        console.error('Failed to get projects', e);
        return [];
    }
}

export const getProjectById = async ({ id }: { id: string }) => {
    console.log("Fetching project with ID:", id);

    if (!PUTER_WORKER_URL) {
        console.info("Using puter.kv as fallback for getProjectById");
        try {
            const proj = await puter.kv.get(`project_${id}`) as DesignItem | null;
            return proj || null;
        } catch (e) {
            console.error("Failed to fetch KV project", e);
            return null;
        }
    }

    try {
        const response = await puter.workers.exec(
            `${PUTER_WORKER_URL}/api/projects/get?id=${encodeURIComponent(id)}`,
            { method: "GET" },
        );

        console.log("Fetch project response:", response);

        if (!response.ok) {
            console.error("Failed to fetch project:", await response.text());
            return null;
        }

        const data = (await response.json()) as {
            project?: DesignItem | null;
        };

        console.log("Fetched project data:", data);

        return data?.project ?? null;
    } catch (error) {
        console.error("Failed to fetch project:", error);
        return null;
    }
};
