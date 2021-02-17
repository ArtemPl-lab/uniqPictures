window.onload = () => {
    const from = document.getElementById('form');
    let file = {};
    const onArchiveLoad = (file1) => {
        file = file1;
        const info = document.querySelector('#drop-zone1 .drop-zone__info');
        info.textContent = file.name;
        info.classList.add('active');
    }
    createDropZone('drop-zone1', onArchiveLoad);
    initializeColors();
    InitializeDropdowns();
    from.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('template_zip', file);

        let store = {};
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            store[`${checkbox.name}`] = checkbox.checked;
        });
        let textInputs = document.querySelectorAll('input[type="text"]');
        textInputs.forEach(inp => {
            store[`${inp.name}`] = inp.value;
        });
        let numberInputs = document.querySelectorAll('input[type="number"]');
        numberInputs.forEach(inp => {
            store[`${inp.name}`] = parseInt(inp.value);
        });
        let textAreas = document.querySelectorAll('textarea');
        textAreas.forEach(textarea => {
            store[`${textarea.name}`] = textarea.value;
        });
        let radios = document.querySelectorAll('input[type="radio"]:checked');
        radios.forEach(radio=>{
            store[`${radio.name}`] = radio.value;
        });
        let color = document.querySelector('#colors input[type="radio"]:checked');
        store[`${color.name}`] = JSON.parse(color.value);
        formData.set('params', JSON.stringify(store));
        
        let watermarkInp = document.getElementById('water-mark-file');
        formData.set('img_watermark', watermarkInp.files[0]);

        sendData(formData);
    }

    const sendData = async (data) => {
        const response = await fetch('https://slpv.foxcpp.dev/images', {
            method: 'POST', 
            body: data
        });
        const blob = await response.blob();
        let url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "response.zip";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();  //afterwards we remove the element again         
    }
}