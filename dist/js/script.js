$( document ).ready(function() {

    function catalogItemCounter(field){

        function fieldCount(el) {

            var
                // Мин. значение
                min = el.data('min') || false,

                // Макс. значение
                max = el.data('max') || false,

                // Кнопка уменьшения кол-ва
                dec = $('.dec');

                // Кнопка увеличения кол-ва
                inc = $('.inc');

            function init(el) {
                if(!el.attr('disabled')){
                    dec.on('click', decrement);
                    inc.on('click', increment);
                }

                // Уменьшим значение
                function decrement() {
                    var value = parseInt(el[0].value);
                    value--;

                    if(!min || value >= min) {
                        el[0].value = value;
                        el[0].value+= " человек";
                    }

                };

                // Увеличим значение
                function increment() {
                    var value = parseInt(el[0].value);

                    value++;

                    if(!max || value <= max) {
                        el[0].value = value++;
                        el[0].value+= " человек";
                    }

                };

            }

            el.each(function() {
                init($(this));
            });
        };

        $(field).each(function(){
            fieldCount($(this));
        });
    }

    catalogItemCounter('.fieldCount');

$('.check__button-top').html("<span>&#9650;</span>");
$('.check__button-bottom').html("<span>&#9660;</span>");

/*This function calc summ from checked parameter form*/
function calc(){
var sumForPeople = 2100 + ((parseInt($('#people').val())-1)*300);
var sumForLunch = parseInt($('#lunch').val())*250;
var sumForDinner = parseInt($('#dinner').val())*450;
var sumMorningTransfer = 0;
var sumNightTransfer = 0;
var earlyTime = 0;
var lateTime = 0;
var dayCount = 3;
var discount = 5; /*discount setting in percent*/

switch($('input[name=way]:checked').val()){
	case 'one_way_am': sumMorningTransfer = 350;
	break;
	case 'roundtrip_am': sumMorningTransfer = 700;
	break;
	default: sumMorningTransfer = 0;
}
 switch($('input[name=way-return]:checked').val()){
	case 'one_way_pm': sumNightTransfer = 500;
	break;
	case 'roundtrip_pm': sumNightTransfer = 1000;
	break;
	default: sumNightTransfer = 0;
}

switch($('input[name=time-early]:checked').val()){
	case 'early-time_am': earlyTime=2100 * 1;
	break;
	case 'time_am': earlyTime=2100 * 0.5;
	break;
	default: earlyTime= 0;
}

switch($('input[name=time-late]:checked').val()){
	case 'late-time_pm': lateTime=2100 * 1;
	break;
	case 'time_pm': lateTime=2100 * 0.5;
	break;
	default: lateTime= 0;
}

var allSumm=sumForPeople*dayCount+sumForLunch*dayCount+sumForDinner*dayCount+sumMorningTransfer+sumNightTransfer+lateTime+earlyTime;

setSumm(allSumm); 
calcDiscount(allSumm, discount);
}

function calcDiscount(sum, discount){
	var sumDiscount = sum * (discount / 100)
	var sumWithDiscount =sum - sumDiscount;
	$('.total-info__cost-number').html(sum + '<span class="glyphicon glyphicon-ruble"></span>');
	$('#summ').html(sumWithDiscount + '<span class="glyphicon glyphicon-ruble total-info__cost-summ-icon"></span>');
}

function setSumm(sum){
	$('.total-info__price-number').html(sum + '<span class="glyphicon glyphicon-ruble"></span>');
	
}

$('input, .dec, .inc').on('click change blur input keyup', function(){
	calc();
});
});
