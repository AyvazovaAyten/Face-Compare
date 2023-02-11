$(document).ready(function () {

    const dropArea = document.getElementsByClassName('image-drop-area');
    const checkBtn = document.getElementById('checkButton');
    const result = document.querySelector('.result');
    let resultText = document.getElementById('resultText');

    function readURL(input) {
        if (input.files && input.files[0]) {

            if (result.classList.contains('show')) {
                result.classList.remove('show');
                result.classList.add('hide');
            }
            resultText.innerText = "";
            let el = input.parentNode;

            var reader = new FileReader();
            reader.onload = function (e) {
                let preview = el.parentNode.querySelector('.imagePreview');
                $(preview).css('background-image', 'url(' + e.target.result + ')');
                $(preview).hide();
                $(preview).fadeIn(650);
                let filestr = reader.result.split('base64,');
                el.parentNode.querySelector('.hidden').value = filestr[1];
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".imageUpload").change(function () {
        readURL(this);
    });


    checkBtn.addEventListener('click', () => {
        let firstImage = document.getElementById('firstImage');
        let secondImage = document.getElementById('secondImage');
        result.classList.add('show');
        result.classList.remove('hide');

        if (!firstImage.files.length || !secondImage.files.length) {
            resultText.innerText = "Please upload images";
            return false;
        }

        let file1 = document.getElementById('file1').value;
        let file2 = document.getElementById('file2').value;

        $.ajax({
            url: `http://45.80.175.27:5000/compare`,
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                'img1_base64': file1,
                'img2_base64': file2
            }),
            cache: false,
            success: (res) => {
                if (res.includes('True')) {
                    if (resultText.classList.contains('red')) {
                        resultText.classList.remove('red');
                    }
                    resultText.classList.add('green');
                    resultText.innerText = "EYNİ ADAMDIR";
                } else {
                    if (resultText.classList.contains('green')) {
                        resultText.classList.remove('green');
                    }
                    resultText.classList.add('red');
                    resultText.innerText = "FƏRQLİ ADAMDIR";
                }

            },
            error: (err) => {
                console.log(err);
                resultText.innerText = "ERROR";
                if (resultText.classList.contains('green')) {
                    resultText.classList.remove('green');
                }
                resultText.classList.add('red');
            }
        });

        // let iconContainer = document.getElementById('centered');
        // let leftHuman = document.getElementById('leftHuman');
        // let rightHuman = document.getElementById('rightHuman');

        // if (iconContainer.classList.contains('hide')) {
        //     iconContainer.classList.add('show');
        //     iconContainer.classList.remove('hide');
        //     leftHuman.classList.remove('left_collapsed');
        //     rightHuman.classList.remove('right_collapsed');
        //     leftHuman.classList.add('left_appart');
        //     rightHuman.classList.add('right_appart');
        // } else {
        //     iconContainer.classList.remove('show');
        //     iconContainer.classList.add('hide');
        //     leftHuman.classList.add('left_collapsed');
        //     rightHuman.classList.add('right_collapsed');
        //     leftHuman.classList.remove('left_appart');
        //     rightHuman.classList.remove('right_appart');
        // }

    });

    // const preventDefaultAndPropagation = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    // };

    // ['dragenter', 'dragleave', 'drop', 'dragover'].forEach(e => {
    //     Array.from(dropArea).forEach(el => el.addEventListener(e, preventDefaultAndPropagation));
    // });

    // ['dragenter', 'dragover'].forEach(e => {
    //     Array.from(dropArea).forEach(el => {
    //         el.addEventListener(e, () => {
    //             el.classList.add('active');
    //         });
    //     });
    // });

    // ['dragleave', 'drop'].forEach(e => {
    //     Array.from(dropArea).forEach(el => {
    //         el.addEventListener(e, () => {
    //             el.classList.remove('active');
    //         });
    //     });
    // });


    // Array.from(dropArea).forEach(el => el.addEventListener('drop', event => {
    //     dowlandingfiles = 0;
    //     const dataTransfer = event.dataTransfer;
    //     const files = dataTransfer.files
    //     const filesAsArray = [...files];

    //     filesAsArray.forEach(previewFile);
    //     filesAsArray.forEach(uploadFile);
    // })
    // );


    // const previewFile = (file) => {
    //     const fileReader = new FileReader();

    //     fileReader.readAsDataURL(file);

    //     fileReader.onloadend = function (e) {
    //         // let el = console.log(e.dropArea);
    //         // let preview = el.parentNode.querySelector('.imagePreview');
    //         // $(preview).css('background-image', 'url(' + e.target.result + ')');
    //         // $(preview).hide();
    //         // $(preview).fadeIn(650);

    //     }
    // };

    // const uploadFile = (file) => {
    //     const formData = new FormData();
    //     formData.append('file', file);
    // };


});



