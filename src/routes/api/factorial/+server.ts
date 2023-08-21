import { sequence } from '@sveltejs/kit/hooks'

// requestEvent is a parameter that will get receives the request body
export async function POST( requestEvent) {
    const { request } = requestEvent
    // .json() converts the request to json and will be stored to sequence
    let { sequence } = await request.json();

    let ans = 1
    /**
     * the for loop will loop through until it gets to the max number
     * in this case, it is sequence
     * if sequence is equal to 5, the index will increment up to 5
     */
    for(let index = 1; index <= sequence; index++){
        /**
         * the formula is ans times the number of index
         * example
         * if sequence is equal to 5 then index will loop through 5
         * and ans is equal to 1
         * index * answer = product (ans variable)
         * 1 * 1 = 1
         * 2 * 1 = 2
         * 3 * 2 = 6
         * 4 * 6 = 24
         * 5 * 24 = 120
         * ans = 120
         */
        ans = index * ans
    }

    return new Response(JSON.stringify({ answer : ans }))
}