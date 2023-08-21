import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = ({ params }) => {
    return {
        post: {
            ans: `0`
        }
    }
}