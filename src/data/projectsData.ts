export interface ProjectSample {
    title: string;
    slug: string;
}

export const projectSample: ProjectSample = {
    title: "Project Sample",
    slug: "project-sample"
}

export const projectsData: Record<string, ProjectSample> = {
    'project-sample': projectSample
}