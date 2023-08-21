import { sequence } from '@sveltejs/kit/hooks'

export async function POST(requestEvent){
    const { request } = requestEvent
    let { sequence } = await request.json();
    // array of basic operators
    const operator = ['*','/','+','-']
    let item = 0
    let ans: any
    /**
     * the while() will loop until the sequence 
     * dont have any basic operators inside
     */ 
    while(/[\*\+\/\-]/.test(sequence)){
        /**
         * match() will divide the numbers from operator 
         * using the regular expression /[^\d()]+|[\d.]+/g
         * for example
         * sequence = 10*255-300
         * chars will be an array of [10,*,255,-,300]
         */ 
        let chars = sequence.match(/[^\d()]+|[\d.]+/g)
        // loop through the operator
        for(let i = 0; i < operator.length; i++){
            /**
             * as you can see, these if statements are almost identical
             * I do this so i can achieve the MDAS rule on doing math
             */

            // check if the operator is '*' so it can perform multiplication
            if(operator[i] === '*'){
                    // re-divide the sequence 
                    chars = sequence.match(/[^\d()]+|[\d.]+/g)
                    // check if the chars[item] is a mathematical operator
                    if(chars[item] == '*'){
                        // proceed to multiplication and store to ans
                        ans = chars[item-1] * chars[item+1]
                        /**
                         * chars will have a new value based on the code below
                         * the slice() will get the item from chars
                         * { parameter of slice(start,end) }
                         * if sequence is [1,+,1,*,2]
                         * the result will be [1,+,2]
                         */
                        chars = chars.slice(0, item-1) + ans + chars.slice(item+2, chars.length)
                        // clearing the sequence
                        sequence = ''
                        // loop through the chars array and append it on sequence
                        // if chars is [1,+,1-100]
                        // result is 1+1-100
                        for(let i = 0; i < chars.length; i++){
                            if(chars[i] !== ','){
                                sequence += chars[i]
                                item = 0;
                            }
                            
                        }
                    }
            }
            // duplicate of multiplication above but instead division
            if(operator[i] === '/'){
                chars = sequence.match(/[^\d()]+|[\d.]+/g)
                if(chars[item] == '/'){
                    ans = chars[item-1] / chars[item+1]
                    chars = chars.slice(0, item-1) + ans + chars.slice(item+2, chars.length)
                    sequence = ''
                    for(let i = 0; i < chars.length; i++){
                        if(chars[i] !== ','){
                            sequence += chars[i]
                            item = 0;
                        }
                    }
                }
            }
            // duplicate of multiplication above but instead addition
            if(operator[i] === '+'){
                chars = sequence.match(/[^\d()]+|[\d.]+/g)
                if(chars[item] == '+'){
                    ans = chars[item-1] + chars[item+1]
                    chars = chars.slice(0, item-1) + ans + chars.slice(item+2, chars.length)
                    sequence = ''
                    for(let i = 0; i < chars.length; i++){
                        if(chars[i] !== ','){
                            sequence += chars[i]
                            item = 0;
                        }
                    }
                }
            }
            // duplicate of multiplication above but instead subtraction
            if(operator[i] === '-'){
                chars = sequence.match(/[^\d()]+|[\d.]+/g)
                if(chars[item] == '-'){
                    ans = chars[item-1] - chars[item+1]
                    chars = chars.slice(0, item-1) + ans + chars.slice(item+2, chars.length)
                    sequence = ''
                    for(let i = 0; i < chars.length; i++){
                        if(chars[i] !== ','){
                            sequence += chars[i]
                            item = 0;
                        }
                    }
                }
            }
        }
        // increment the item
        item++
    }
    // return the sequence as an answer
    return new Response(JSON.stringify({ answer : sequence }))
}