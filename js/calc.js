$(document).ready(function()  {
	let display = document.getElementById('display');
// Numbers show when you type
    let inputs = document.getElementsByClassName("number");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", function()	{
            display.innerHTML += +this.id;
		});
    }
    $("body").keydown(function (e) {
    	if (e.keyCode >= 48 && e.keyCode <= 57) {
            display.innerHTML += e.keyCode-48;
        }
        switch (e.keyCode)	{
			case 187:
                writePlus();
			break;
            case 13:
                vhod = display.innerHTML;
                equal();
            break;
            case 189:
                writeMinus();
            break;
            case 191:
                writeDivision();
            break;
            case 8:
                writeBack();
            break;
            case 27:
                writeCe();
                break;
		}
    });
// Clear display when you type CE
    $("#ce").click(writeCe);

// sum
	$("#plus").click(writePlus);

// equal
	$("#equal").click(function  ()  {
        vhod = display.innerHTML;
        // while (display.innerHTML.search(/\+/) !== -1 || display.innerHTML.search(/\-/) !== -1)  {
            equal();
        // }

    });

// minus
    $("#minus").click(writeMinus);

//back
    $("#back").click(writeBack);

//factorial
    $("#factorial").click(writeFactorial);

//bracket-open
    $("#bracket-open").click(writeBracketOpen);

//bracket-closed
    $("#bracket-closed").click(writeBracketClosed);

//Pi
    $("#pi").click(writePi);

//multiply
    $("#multiply").click(writeMultiply);

//sqrt
    $("#sqrt").click(writeSqrt);

//division
    $("#division").click(writeDivision);

//point
    $("#point").click(writePoint);

    function equal() {
        // скобки
        while (display.innerHTML.search(/\(/) !== -1 || display.innerHTML.search(/\)/) !== -1) {
            bracket();
        }

        // pi
        while (display.innerHTML.search(/π/) !== -1 ) {
            pi();
        }

        // sqrt
        while (display.innerHTML.search(/√/) !== -1 )   {
            sqrt();
        }

        // Факториал
        while (display.innerHTML.search(/!/) !== -1)    {
            factorial();
        }

        // умножение\деление
        while (display.innerHTML.search(/×/) !== -1 || display.innerHTML.search(/÷/) !== -1) {
            multiplyAndDivision();
        }

        // plus and minus
        while (display.innerHTML.search(/\w\+\w/) !== -1 || display.innerHTML.search(/\w-\w/) !== -1) {
            plusAndMinus();
        }

        return display.innerHTML;
    }

    function sqrt() {
        let out = display.innerHTML;
        let num = out.match(/√([^×\-+÷]+)/);
        num = +num.slice(1);
        let result = Math.sqrt(num);
        display.innerHTML = out.replace(/√([^×\-+÷]+)/, result);
    }

    function factorial() {
        let out = display.innerHTML;
        let num = display.innerHTML.match( /[^×\-+÷]+(?=!)/ );
        if (num === null)   {
            display.innerHTML = "please write number before factorial";
        }   else    {
            num = +num;
            num = Math.ceil(num);
            let result = solveFactorial(num);
            display.innerHTML = out.replace(/([^×\-+÷]+!)/, result);
        }
    }

    function pi()   {
        let out = display.innerHTML;
        let numPi = 3.1415926;
        while (display.innerHTML.search( /π/ ) !== -1)    {
            display.innerHTML = out.replace( /π/, numPi );
        }
    }

    function plusAndMinus() {
        let out = display.innerHTML;
        let firstPlus = display.innerHTML.match( /[^×\-+÷]+(?=\+)/ );
        if (display.innerHTML.search( /[^×\-+÷]+(?=\+)/ ) !== -1) {
            var firstIndexPlus = firstPlus.index;
        }   else    {
            var firstIndexPlus = -1;
        }
        let firstMinus = display.innerHTML.match( /[^×\-+÷]+(?=-)/ );
        if (display.innerHTML.search( /[^×\-+÷]+(?=-)/ ) !== -1) {
            var firstIndexMinus = firstMinus.index;
        }   else    {
            var firstIndexMinus = -1;
        }
        if (firstIndexPlus !== -1 &&  firstIndexMinus === -1) {
            firstPlus = +firstPlus;
            let secondPlus = display.innerHTML.match(/\+([^×\-+÷]+)/);
            secondPlus = +secondPlus.slice(1);
            let summ = firstPlus + secondPlus;
            display.innerHTML = out.replace(/[^×\-+÷]+\+[^×\-+÷]+/, summ);
        }   else if (firstIndexPlus === -1 &&  firstIndexMinus !== -1) {
            firstMinus = +firstMinus;
            let secondMinus = display.innerHTML.match(/-([^×\-+÷]+)/);
            secondMinus = +secondMinus.slice(1);
            let difference = firstMinus - secondMinus;
            display.innerHTML = out.replace(/[^×\-+÷]+-[^×\-+÷]+/, difference);
        } else if (firstIndexPlus < firstIndexMinus)    {
            firstPlus = +firstPlus;
            let secondPlus = display.innerHTML.match(/\+([^×\-+÷]+)/);
            secondPlus = +secondPlus.slice(1);
            let summ = firstPlus + secondPlus;
            display.innerHTML = out.replace(/[^×\-+÷]+\+[^×\-+÷]+/, summ);
        } else if (firstIndexPlus> firstIndexMinus) {
            firstMinus = +firstMinus;
            let secondMinus = display.innerHTML.match(/-([^×\-+÷]+)/);
            secondMinus = +secondMinus.slice(1);
            let difference = firstMinus - secondMinus;
            display.innerHTML = out.replace(/[^×\-+÷]+-[^×\-+÷]+/, difference);
        }
    }

    function multiplyAndDivision() {
        let out = display.innerHTML;
        let firstMultiply = display.innerHTML.match( /[^×\-+÷]+(?=×)/ );
        if (display.innerHTML.search( /[^×\-+÷]+(?=×)/ ) !== -1) {
            var firstIndexMultiply = firstMultiply.index;
        }   else    {
            var firstIndexMultiply = -1;
        }
        let firstDivision = display.innerHTML.match( /[^×\-+÷]+(?=÷)/ );
        if (display.innerHTML.search( /[^×\-+÷]+(?=÷)/ ) !== -1) {
            var firstIndexDivision = firstDivision.index;
        }   else    {
            var firstIndexDivision = -1;
        }
        if (firstIndexMultiply !== -1 &&  firstIndexDivision === -1) {
            firstMultiply = +firstMultiply;
            let secondMultiply = display.innerHTML.match(/×([^×\-+÷]+)/);
            secondMultiply = +secondMultiply.slice(1);
            let multip = firstMultiply * secondMultiply;
            display.innerHTML = out.replace(/[^×\-+÷]+×[^×\-+÷]+/, multip);
        }   else if (firstIndexMultiply === -1 &&  firstIndexDivision !== -1) {
            firstDivision = +firstDivision;
            let secondDivision = display.innerHTML.match(/÷([^×\-+÷]+)/);
            secondDivision = +secondDivision.slice(1);
            let divis = firstDivision / secondDivision;
            display.innerHTML = out.replace(/[^×\-+÷]+÷[^×\-+÷]+/, divis);
        } else if (firstIndexMultiply < firstIndexDivision)    {
            firstMultiply = +firstMultiply;
            let secondMultiply = display.innerHTML.match(/×([^×\-+÷]+)/);
            secondMultiply = +secondMultiply.slice(1);
            let multip = firstMultiply * secondMultiply;
            display.innerHTML = out.replace(/[^×\-+÷]+×[^×\-+÷]+/, multip);
        } else if (firstIndexMultiply > firstIndexDivision) {
            firstDivision = +firstDivision;
            let secondDivision = display.innerHTML.match(/÷([^×\-+÷]+)/);
            secondDivision = +secondDivision.slice(1);
            let divis = firstDivision / secondDivision;
            display.innerHTML = out.replace(/[^×\-+÷]+÷[^×\-+÷]+/, divis);
        }
    }

    function bracket()    {

            let out = display.innerHTML;
            if (out.search( /\(/ ) !== -1 && out.search( /\)/ ) === -1) {
                display.innerHTML = "close bracket";
                setTimeout(returnOut, 2000);
            } else if (out.search( /\(/ ) === -1 && out.search( /\)/ ) !== -1)    {
                display.innerHTML = "open bracket";
                setTimeout(returnOut, 2000);
            } else if (out.match(/\(/ig).length === out.match(/\)/ig).length) {
                let skobka = out.match( /\(([^()]+)\)/ );
                display.innerHTML = skobka[1];
                let fragment = equal();
                display.innerHTML = vhod.replace(skobka[0], fragment);
                vhod = display.innerHTML;
                
                // display.innerHTML = out.substring(start + 1, end);
                // let fragment = equal();
                // let errased = vhod.substring(start, end + 1);
                // display.innerHTML = vhod.replace(errased, fragment);
                // vhod = display.innerHTML;
            }   else    {
                display.innerHTML = "brackets error";
            }

    }

    function solveFactorial(num)    {
        if (num > 1)    {
            return num * solveFactorial(num-1);
        }
        return 1;
    }

    function returnOut(out) {
        display.innerHTML = out;
    }

    function writeCe() {
        display.innerHTML = "";
    }

    function writePlus() {
        display.innerHTML += "+";
    }

    function writeMinus() {
        display.innerHTML += "-";
    }

    function writeBack() {
        let str = display.innerHTML;
        str = str.slice(0, -1);
        display.innerHTML = str;
    }
    
    function writeFactorial() {
        display.innerHTML += "!";
    }

    function writeBracketOpen()  {
        display.innerHTML += "(";
    }

    function writeBracketClosed()  {
        display.innerHTML += ")";
    }

    function writePi()   {
        display.innerHTML += "π";
    }

    function writeMultiply() {
        display.innerHTML += "×";
    }

    function writeSqrt() {
        display.innerHTML += "√"
    }

    function writeDivision() {
        display.innerHTML += "÷"
    }

    function writePoint() {
        display.innerHTML += "."
    }
});