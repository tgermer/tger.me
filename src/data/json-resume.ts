import type { Basics, Work, Education, Certificate, Skill, Language, Interest, Project, Reference } from "./cv_types";
import { site } from "./site";

export interface CvExports {
    basics: Basics;
    work: Work[];
    education: Education[];
    certificates: Certificate[];
    skills: Skill[];
    languages: Language[];
    interests: Interest[];
    projects: Project[];
    references: Reference[];
}

function ensureUrl(raw?: string): string | undefined {
    if (!raw) return undefined;
    return raw.startsWith("http") ? raw : `https://${raw}`;
}

/**
 * Converts our CV data to a valid JSON Resume object.
 * @see https://jsonresume.org/schema
 */
export function toJsonResume(cv: CvExports): Record<string, unknown> {
    const result = {
        $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
        basics: {
            name: cv.basics.name,
            label: cv.basics.label,
            image: `${site.url}/assets/profile.jpg`,
            email: cv.basics.email,
            phone: cv.basics.phone,
            url: ensureUrl(cv.basics.url),
            summary: cv.basics.summary || undefined,
            location: {
                address: cv.basics.location.address,
                postalCode: cv.basics.location.postalCode || undefined,
                city: cv.basics.location.city,
                countryCode: cv.basics.location.countryCode || undefined,
                region: cv.basics.location.region || undefined,
            },
            profiles: cv.basics.profiles?.map((p) => ({
                network: p.network,
                username: p.username || undefined,
                url: ensureUrl(p.url)!,
            })),
        },
        work: (cv.work || []).map((w) => ({
            name: w.name,
            position: w.position?.join(", ") || w.typeOfEmployment || undefined,
            url: ensureUrl(w.url),
            startDate: w.startDate,
            endDate: w.endDate || undefined,
            summary: w.summary || undefined,
            highlights: w.highlights?.length ? w.highlights : undefined,
        })),
        education: (cv.education || []).map((e) => {
            const courses = [e.majorFieldOfStudy, e.thesis?.title && `Thesis: ${e.thesis.title}`].filter(Boolean) as string[];
            return {
                institution: e.institution,
                url: ensureUrl(e.url),
                area: e.area,
                studyType: e.studyType,
                startDate: e.startDate,
                endDate: e.endDate,
                score: e.score !== undefined ? String(e.score) : undefined,
                courses: courses.length > 0 ? courses : undefined,
            };
        }),
        certificates: (cv.certificates || []).map((c) => ({
            name: c.name + (c.degree ? `, ${c.degree}` : ""),
            date: c.endDate || c.startDate,
            issuer: c.issuer,
            url: ensureUrl(c.url),
        })),
        skills: (cv.skills || []).map((s) => ({
            name: s.name,
            keywords: s.keywords,
        })),
        languages: (cv.languages || []).map((l) => ({
            language: l.language,
            fluency: l.fluency,
        })),
        interests: (cv.interests || []).map((i) => ({
            name: i.name,
            keywords: i.keywords?.length ? i.keywords : undefined,
        })),
        projects: (cv.projects || []).map((p) => ({
            name: p.name,
            startDate: p.startDate,
            endDate: p.endDate || undefined,
            highlights: p.highlights?.length ? p.highlights : undefined,
            url: ensureUrl(p.urls?.[0]?.url),
        })),
        references: (cv.references || []).map((r) => ({
            name: r.name,
            reference: r.reference || [r.position, r.department, r.company].filter(Boolean).join(", "),
        })),
    };

    // Clean: remove undefined values and replace non-breaking spaces with regular spaces
    return JSON.parse(JSON.stringify(result).replace(/\u00A0/g, " "));
}
