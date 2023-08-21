import { sequence } from '@sveltejs/kit/hooks'

// requestEvent is a parameter that will get receives the request body
export async function POST( requestEvent) {
    const { request } = requestEvent
    // .json() converts the request to json and will be stored to sequence
    let { sequence } = await request.json();
    let ans:any
    // get the square root of the requested number
    ans = sequence / 2    
    // returns the answer in JSON format using JSON.stringify()
    return new Response(JSON.stringify({ answer : ans }))
}