import swal from "sweetalert";

export function handleErrorStatus(response) {
  console.log('response',response)
        if(response.status||response.code==400){
            let errorsText=''

            let keys = response.data?Object.keys(response.data.error):Object.keys(response.error);
            keys.map((key) => 
            {
                errorsText+=`\n ${key} : ${response.data?response.data.error[key]:response.error[key]}`
            })

            swal({
                icon: "error",
                title: "Some data is not valid",
                text: errorsText,
              });
        }
         else {
            swal({
                icon: "error",
                title: "Error",
                text: "Something went wrong, server says "+response.status,
            });
            throw response.status
        }
}


export function handleSuccessMessage(text) {
    swal({
        title: "Good job!",
        text: text,
        icon: "success",
      });
}