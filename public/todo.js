$(document).ready(()=>{


  $("#submit_btn").click(function(){
      $.ajax({
        type: "POST",
        url: "/",
        data: $('#sumbit_form').serialize(),
        // async: false,
        // data: "json",
        // dataType: "json",
        success: function (data) {
          console.log(data)
          AppendItem(data.item_name, data.key_Name);
        }
      });

      $("#new_Item").val('');
    });

//----------------------------------

  $('body').on("click","#main_list form .item .check_box",function() 
    {
      // if($(this).prop('checked'))
      // {
        let delete_data = $(this).val();
        removeItem(delete_data)
        $.post("/delete", {key: delete_data})
      // }
    });  

//----------------------------------

    // $(".burger-align").css("transform" , `translateX(${- 0.95*$("#menu_list").outerWidth()}px)`);
    nav();
    edit();
})

function AppendItem(data_in_Name, data_in_Key){
//  $('#main_list').append(`<div class="item"><input type="checkbox"><p>${data_in}</p></div>`)
  $('#main_list').append(`<form id="${data_in_Key}"><div class="item"><input class="check_box" type="checkbox" name="checkbox" value="${data_in_Key}"><p>${data_in_Name}</p></div></form>`)
}

function removeItem(key){
  $(`#${key}`).fadeTo(100,0).animate({height: 0})
  setTimeout(()=>{$(`#${key}`).remove()},1000);
}

// `<form id="${data_in_Key}">
// <div class="item">
//     <input class="check_box" type="checkbox" name="checkbox" value="${data_in_Key}">
//     <p>${data_in_Name}</p>
// </div>
// </form>`


function nav(){
  $('#simply-burger').click(function(){
    //On click, toggle on 'this' (#simply-burger) the class open
        $("#simply-burger").toggleClass('open');
        $('#nav_container').toggleClass('nav_open')
        $("#slide_menu").toggleClass('open_list');
        // $("#menu_list").toggleClass('open_list');
        $(".burger-align").toggleClass('open_icon');

        

  });
}

function edit(){
  $('.edit_btn').click(function(){
    var clicked = $(event.target);
    var editableId = clicked.data("edit");
    var old_text = $('#editable'+editableId).text();
    if($('#editable'+editableId).attr('contenteditable') == 'false')
    {
    $('#editable'+editableId).attr('contenteditable', 'true')
    $('#editable'+editableId).focus();
    }
    // else{
    //   $('#'+editableId).attr('contenteditable', 'false')
    //   $('#'+editableId).blur();
    // }
    $('#editable'+editableId).keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        $('#editable'+editableId).attr('contenteditable', 'false')
        $('#editable'+editableId).blur();
        console.log($('#editable'+editableId).text())
        // let update_id = 'editable'+editableId
        $.post("/update_task", {old_name: old_text, new_name: $('#editable'+editableId).text()})
      }
  });
  })
}