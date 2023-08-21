<script lang="ts">
    let ans = '0'
    let sqrt = '&radic;';
    let chk = false
    let link : string

    //#region Blockers
    function AddZero(inc: number){
        let i = 0;
        while(i < inc){
            ans += '0';
            i++;
        }
    }
    /*
    *   check if the received string has operator on the end
    *   This will prevent to add multiple operation in one sequence
    *   using the charAt() API, it will get the last character from string
    *   and the function will return a boolean when the lastChar has [+,-,/,*]
    */ 
    function endsWithOperator(str: string) {
        var lastChar = str.charAt(str.length - 1);
        return lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === '*';
    }
    /*
    *   adds a number or operator
    */
    function Append(num:any){
        /*
        *   check the num variable if it has an operator on last index of string
        *   and isNaN() will check if its a number or not
        *   if the condition is true the Append() will disregard the recent input
        *   in this case will be the operator [+,-,/,*]
        */ 

        if(endsWithOperator(String(ans)) && isNaN(num)){ 
            return; 
        }
        /*  the chk variable with "false" boolean value as default 
        *   will be triggered when equal button is clicked
        */
        if(chk){
            // check if the new entered value is a number so the sequence will be reset
            if(!isNaN(num)){
                Clear();                
            }
            chk = false;
        }
        //  check if the value is a exclamation point (factorial symbol)
        if(num === '!'){
            // check if the sequence are already have a factorial symbol
            // and disregard if true
            if(ans.includes('!')){return;}
        }
        // clear the ans if the starting value is zero
        if(ans === '0'){
            ans = "";
        }
        // check if the num value is 'sq' so it can proceed to Squared()
        // when equal button is clicked
        if(num === 'sq'){
            ans += sqrt;
            return;
        }
        ans += num;
    }
    // this function process the sequence from ans variable
    //clear the ans
    function Clear(){
        ans = '0';
    }
    //removes the last character from the ans
    function Backspace(){
        ans = String(ans).slice(0,-1);
        if(ans.length === 0){
            ans = '0';
        }
    }
//#endregion
    
    /**
     * function to call the API that will 
     * process the mathematical expression
     */
    async function calculate(){
        //  remove the factorial sign and set the link/url to factorial
        if(ans.includes('!')){
            ans = ans.replace('!','')
            link = 'factorial'
        }
        //  remove the square root sign and set the link/url to square
        else if(ans.includes('&radic;')){
            ans = ans.replace('&radic;','')
            link = 'square'
        }
        // for basic computations
        else{
            link = 'basic'
        }

        let str = {sequence: ans}
        // initiate the api request
        const res = await fetch(`/api/${link}`, {
            // api method set to POST
            method: 'POST',
            // request headers
            headers: {
                'Content-Type': 'application/json'
            },
            // request body that will be send to api
            // JSON.stringify() will convert the string to JSON format
            body: JSON.stringify(str)
        })

        if(res.ok){
            // if result is okay (status:200) 
            // it will display the answer processed by api
            const data = await res.json()
            ans = data.answer
        }
        else{
            ans = 'Err0r'
        }

    }
</script>

<table>
<tr>
    <!-- will serve as an answer 
         the {@html ans} is where the ans variable will be displayed
    -->
    <th colspan="4"><span class="header" id="ans">{@html ans}</span></th>
</tr>
<!-- 
    on:click={} is an event that will be triggered
    when the user clicked the td or the table cell
-->
<tr>
    <td on:click={() => Clear()}>C</td>
    <td on:click={() => Append('sq')}>&radic;</td>
    <td on:click={() => Append('!')}>!</td>
    <td on:click={() => Backspace()}>&#8592;</td>
</tr>
<tr>
    <td on:click={() => Append(7)}>7</td>
    <td on:click={() => Append(8)}>8</td>
    <td on:click={() => Append(9)}>9</td>
    <td on:click={() => Append('/')}>/</td>
</tr>
<tr>
    <td on:click={() => Append(4)}>4</td>
    <td on:click={() => Append(5)}>5</td>
    <td on:click={() => Append(6)}>6</td>
    <td on:click={() => Append('*')}>*</td>
</tr>   
<tr>
    <td on:click={() => Append(1)}>1</td>
    <td on:click={() => Append(2)}>2</td>
    <td on:click={() => Append(3)}>3</td>
    <td on:click={() => Append('-')}>-</td>
</tr>
<tr>
    <td on:click={() => AddZero(1)}>0</td>
    <td on:click={() => AddZero(2)}>00</td>
    <td on:click={() => calculate()}>=</td>
    <td on:click={() => Append('+')}>+</td>
</tr>
</table>

<style>
@font-face{
    font-family: Digital;
    font-style: normal;
    font-weight: 550;
    src: url('/fonts/Digital7-rg1mL.ttf');
}
table{
    font-family: Digital;
    width: 600px;
    height: 500px;
    font-size: 40px;
    table-layout: fixed;
    position: absolute;
    top:10%;
    left: 30%;
    border-radius: 30px;
}
table, th, td {
  border: 1px solid black;
  border-radius: 10px;
  padding: 25px;
}
tr td{
    text-align: center;
    transition: background-color 0.3s ease;
}
tr td:hover{
    background-color: rgba(31, 31, 32, 0.425);
    cursor: pointer;
}
.header{
    float: right;
    margin-right: 30px;
}
table tr th{
    background-color: rgba(96, 97, 99, 0.808);
    border-spacing: 5px;
}
</style>