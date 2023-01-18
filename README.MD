  get base64 img;
  
  function changing(e) {
    const input = document.querySelector("input");
    var reader = new FileReader();
    reader.readAsDataURL(input.files[0]);

    reader.onload = () => {
      var url = reader.result;
      document.getElementById("mg").src = url;
    };
  }

