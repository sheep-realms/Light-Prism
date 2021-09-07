String.prototype.colorRgb = function () {
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    var color = this.toLowerCase();
    if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
            var colorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return colorChange;
    } else {
        return color;
    }
}

function rgbtohsv(rgb){
	r=rgb[0]/255;
	g=rgb[1]/255;
	b=rgb[2]/255;
	var h,s,v;
	var min=Math.min(r,g,b);
	var max=v=Math.max(r,g,b);
	var l=(min+max)/2;
	var difference = max-min;
	
	if(max==min){
		h=0;
	}else{
		switch(max){
			case r: h=(g-b)/difference+(g < b ? 6 : 0);break;
			case g: h=2.0+(b-r)/difference;break;
			case b: h=4.0+(r-g)/difference;break;
		}
		h=Math.round(h*60);
	}
	if(max==0){
		s=0;
	}else{
		s=1-min/max;
	}
	s=Math.round(s*100);
	v=Math.round(v*100);
	return [h,s,v];
}

function colorListSetRgb(colorList) {
    colorList.forEach(e => {
        rgbl = e.color.colorRgb();
        e.rgb100 = ["", "", ""]
        e.rgb = rgbl;
        for (i = 0; i < 3; i++) {
            e.rgb100[i] = rgbl[i] / 255 * 100;
        }
        e.black = colorBrightness(e.rgb);
    });
}

function colorBrightness(rgb) {
    let $grayLevel = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;

    if ($grayLevel >= 192) {
    　　return 1;
    } else {
    　　return 0
    }
}

function colorCardLoad(colorList, $sel) {
    colorListSetRgb(colorList);
    colorList.forEach(e => {
        $sel.append('<div class="color-card" data-color="'+e.color+'" data-name="'+e.name+'" data-black="'+e.black+'" data-rh="'+e.rgb100[0]+'%" data-gh="'+e.rgb100[1]+'%" data-bh="'+e.rgb100[2]+'%" style="--color:'+e.color+';--r:'+e.rgb100[0]+'%;--g:'+e.rgb100[1]+'%;--b:'+e.rgb100[2]+'%;"><div class="title">'+e.name+'</div><div class="color">'+e.color+' - '+e.group+'</div><div class="color-rgb-line"><div class="r"><div></div></div><div class="g"><div></div></div><div class="b"><div></div></div></div></div>');
    });
}

function colorCardMenuLoad(colorList, $sel) {
    colorListSetRgb(colorList);
    colorList.forEach(e => {
        $sel.append('<a href="'+e.url+'"><div class="color-card" data-color="'+e.color+'" data-name="'+e.name+'" data-black="'+e.black+'" style="--color:'+e.color+';--r:'+e.rgb100[0]+'%;--g:'+e.rgb100[1]+'%;--b:'+e.rgb100[2]+'%;"><div class="title">'+e.name+'</div><div class="color">'+e.group+'</div><div class="color-rgb-line"><div class="r"><div></div></div><div class="g"><div></div></div><div class="b"><div></div></div></div></div></a>');
    });
}

function pageClickLoad($that) {
    $('body').css('background-color', $that.data('color'));
    $('#color-info .title').text($that.data('name'));
    $('#color-info .color-rgb-line>.r>div').css('height', $that.data('rh'));
    $('#color-info .color-rgb-line>.g>div').css('height', $that.data('gh'));
    $('#color-info .color-rgb-line>.b>div').css('height', $that.data('bh'));
    $('#color-data-hex').text($that.data('color'));
    let rgbl = $that.data('color').colorRgb();
    let hsv = rgbtohsv(rgbl);
    $('#color-data-rgb').text(rgbl[0] + ', ' + rgbl[1] + ', ' + rgbl[2]);
    $('#color-data-hsv').text(hsv[0] + ', ' + hsv[1] + ', ' + hsv[2]);
    if ($that.data('black') == 1) {
        $('body').addClass('black');
    } else {
        $('body').removeClass('black');
    }
}

$('#color-gray').click(function() {
    if ($('html').hasClass('gray')) {
        $('html').removeClass('gray');
    } else {
        $('html').addClass('gray');
    }
});

$('#color-rotate').click(function() {
    if ($('body').hasClass('rotate')) {
        $('body').removeClass('rotate');
    } else {
        $('body').addClass('rotate');
    }
});