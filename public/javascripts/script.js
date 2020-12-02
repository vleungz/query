/* nav func */
function searchFocus(){
    document.getElementById("input").style.border = "solid 1px #DB1E1E";
}

function searchBlur(){
    document.getElementById("input").style.border = "none";
}

function toggleNav(){
    let x = document.getElementById("nav");
    if (x.className === "top-nav") {
        x.className += " responsive";
    } else {
        x.className = "top-nav";
    }
}

/* register func */
function checkPassword(form){
    let password = form.password.value;
    let confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
        alert ("\nPassword does not match: Please try again...")
        return false;
    } else{
        return true;
    }
}

/* index func */
$(function() {
    let container = $('.sortDiv');
    let items = $('.filterDiv');
    items.each(function() {
        // Convert the string in 'data-event-date' attribute to a more
        // standardized date format
        let BCDate = $(this).attr("data-event-date");
        let standardDate = new Date(BCDate).getTime();
        $(this).attr("data-event-date", standardDate);
    });
    items.sort(function(a,b){
        a = parseFloat($(a).attr("data-event-date"));
        b = parseFloat($(b).attr("data-event-date"));
        return a<b ? -1 : a>b ? 1 : 0;
    }).each(function(){
        container.prepend(this);
    });
});

$("#hot").on("click", function () {
    if ($('#hot').hasClass('active')){
        $('#hot').removeClass("active");
        location.reload();
    } else{
        let $wrapper = $('.sortDiv'),
            $articles = $wrapper.find('.filterDiv');
        [].sort.call($articles, function(a,b) {
            return +$(a).attr('data-weight') - +$(b).attr('data-weight');
        });
        $articles.each(function(){
            $wrapper.prepend(this);
        });
        $('#hot').addClass("active");
    }
});

function searchFunction(){
    let input = document.getElementById("input"),
        filter = input.value.toUpperCase(),
        match = document.getElementsByClassName('filterDiv');

    for (let i = 0; i < match.length; i++) {
        let a = match[i].getElementsByTagName("a")[0];
        let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            match[i].style.display = "";
        } else {
            match[i].style.display = "none";
        }
    }
}

function askQuestion(){
    window.location = "/new";
}

$(function() {
    $('.question-span').each(function(index, content) {
        let height = content.offsetHeight,
            lines = height / 24;
        if(lines > 3){
            $(content).addClass('display3');
            $(content).after('<button class="show-more">Show more</button>')
            $('.show-more').on('click', function() {
                $(content).toggleClass('display3');
                //change text of show more element
                $(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
            });
        }
    })
});

function toggleAnswer(id){
    let ans = document.getElementById(id);
    if (ans.style.display === "none") {
        ans.style.display = "block";
    } else {
        ans.style.display = "none";
    }
}

function filterSelection(space) {
    let x = document.getElementsByClassName("filterDiv");
    let y = document.getElementsByClassName("toggle-space");
    for (let i = 0; i < x.length; ++i) {
        if (x[i].className.includes(space)) {
            x[i].style.display = "block";
        } else {
            x[i].style.display = 'none';
        }
    }
    for (let j = 0; j < y.length; ++j) {
        if (y[j].id === space) {
            y[j].style.color = "#DB1E1E";
            y[j].style.textDecoration = 'underline';
        } else {
            y[j].style.color = "black";
            y[j].style.textDecoration = 'none';
        }
    }
}

/* answer func */
$(function() {
    $(".edit-form").on("click", function () {
        $('#edit').hide();
        $('#update').removeClass('display-edit');
    });
});

function cancelUpdate(){
    location.reload();
}

function replyQuestion(){
    $('.answer-form').removeClass('display-answer');
    $('#hide').remove();
}

function cancelAnswer(){
    $('.answer-form').addClass('display-answer');
    $('#name').after(
        ' <label id="hide">\n' +
        '            <input type="text"\n' +
        '                   placeholder="Post your answer here"\n' +
        '                   name="reply"\n' +
        '                   onfocus="replyQuestion()"><br>\n' +
        '         </label>'
    );
}

