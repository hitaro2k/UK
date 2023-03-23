"use strict"
const chooseProduct = () =>{
    let chooseBody = document.querySelector(".full-screen__choose")
    let chooseLeft = document.querySelector(".full-screen__choose-left")
    let chooseRight = document.querySelector(".full-screen__choose-right")
    let chooseBtnMark = document.querySelector("#markSide")
    let chooseBtnYear = document.querySelector("#yearSide")
    let closeLeftSide  = document.querySelectorAll(".close-screen__left")
    let closeRightSide  = document.querySelectorAll(".close-screen__right")
    let companyChoose = document.querySelectorAll(".choose-company__wrapper")
    let yearChoose = document.querySelectorAll(".year-select")
    let companyChooseName = document.querySelectorAll(".choose-company__name")
    let selectModel = document.querySelector(".select-model")

  
    function arrCompany (){
        
        for(let i = 0; i< companyChoose.length; i++){
            companyChoose[i].onclick = () =>{
                companyChooseName [i].classList.toggle("ischoose")
                companyChooseName [i].style.transition = "1s"
                if(companyChooseName[i].classList.contains("ischoose")){
                    selectModel.style.display = "block"
                }else{
                    selectModel.style.display = "none"
                }
                
            }
        }
        yearChoose.forEach((item) =>{
            item.onclick = () =>{
                item.classList.toggle("ischoose")
                item.style.transition = "1s"
            }
        })

      

        return arrCompany
    }
    arrCompany()


    function openChoose(){
        chooseBtnMark.onclick = () =>{
            chooseLeft.classList.add("active")
            chooseBody.style.borderRadius = "0px"
        }
        chooseBtnYear.onclick = () =>{
            chooseRight.classList.add("active")
            
        }
        
        closeLeftSide.forEach((item)=>{
            item.onclick = () =>{
                chooseLeft.classList.remove("active")
                chooseBody.style.borderRadius = "5px"
            }
        })
        closeRightSide.forEach((item) =>{
            item.onclick =() =>{
                chooseRight.classList.remove("active")
            }
        })

        return openChoose
    }

    openChoose()
    return chooseProduct
}

chooseProduct()
export default chooseProduct