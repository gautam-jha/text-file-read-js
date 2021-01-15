const mapper = (key) => {
    // decoder object with all the relevent numbers
    // returning actual number
    const codes = {
        [` _ \n| |\n|_|`]: 0,
        [`   \n  |\n  |`]: 1,
        [` _ \n _|\n|_ `]: 2,
        [` _ \n _|\n _|`]: 3,
        [`   \n|_|\n  |`]: 4,
        [` _ \n|_ \n _|`]: 5,
        [` _ \n|_ \n|_|`]: 6,
        [` _ \n  |\n  |`]: 7,
        [` _ \n|_|\n|_|`]: 8,
        [` _ \n|_|\n _|`]: 9,
    };
    return codes[key];
};

(async () => {
    try {
        const response = await fetch("numbers.txt");
        if (response.status == 200) {
            const readFile = await response.text();
            document.body.innerHTML = "<h1>Parsed Text on Browser</h1>";
            const lines = readFile.split("\n");
            for (let i = 0; i <= lines.length;) {
                const div = document.createElement("div");

                //parsing line 1
                let lineArray = lines[i];
                let arr =
                    typeof lineArray !== "undefined" ? lineArray.match(/.{1,3}/g) : [];

                //parsing line 2
                let lineArray1 = lines[i + 1];
                let arr1 =
                    typeof lineArray1 !== "undefined" ? lineArray1.match(/.{1,3}/g) : [];

                //parsing line 3
                let lineArray2 = lines[i + 2];
                let arr2 =
                    typeof lineArray2 !== "undefined" ? lineArray2.match(/.{1,3}/g) : [];

                // Creating a number array
                let actualNumber = [];
                for (let key in arr) {
                    if (
                        lineArray[key] &&
                        lineArray1[key] != null &&
                        lineArray2[key] != null
                    ) {
                        let number = arr[key] + "\n" + arr1[key] + "\n" + arr2[key];
                        //adding the number in the array
                        actualNumber.push(mapper(number));
                    }
                }
                //writing it in the html dom
                div.innerHTML = actualNumber.join("");
                document.body.appendChild(div);
                // console.log(lines[i]);
                i = i + 3;
            }
        }
    } catch (err) {
        console.log(err);
    }
})();
