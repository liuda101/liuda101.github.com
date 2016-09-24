(function(){
	var court = $('#court');
	var pageWidth = $('body').width() - 20;
	var w = 28;
	var h = 15;
	var ratio = Math.floor(pageWidth / 28);
	var courtW = ratio * 28;
	var courtH = ratio * 15;
	court.css('width', courtW + 'px').css('height', courtH + 'px');


	var attr = {
		fill: 'rgba(0,0,0,0)',
		stroke: '#000',
		strokeWidth: 1
	};
	var snap = Snap('#svg');
	var rect = snap.rect(0, 0, courtW, courtH);
	rect.attr(attr);

	var lineCenter = snap.line(courtW / 2, 0, courtW / 2, courtH);
	lineCenter.attr(attr);

	var circleCenter = snap.circle(courtW / 2, courtH / 2, 1.8 * ratio);
	circleCenter.attr(attr);


	var trippleR = 7.25 * ratio;
	var trippleD = 0.9 * ratio;
	var paintR = 1.25 * ratio;
	var basketD = 0.225 * ratio;
	var basketR = 0.45 * ratio;
	var lbW = 1.8 * ratio;
	var lbD = 1.2 * ratio;
	var leftBasketD = snap.line(lbD, courtH / 2, lbD + basketD, courtH / 2);
	var trippleW = courtH / 2 - trippleD;
	var trippleX = Math.sqrt(trippleR * trippleR - trippleW * trippleW);
	var leftTripple = snap.path(["M0", trippleD, "L" + (trippleX + lbD + basketD + basketR), trippleD, "A" + trippleR, trippleR, 0, 0, 1, (trippleX + lbD + basketD + basketR), courtH - trippleD, "L0", courtH - trippleD].join(" "));
	leftTripple.attr(attr);

	var rightTripple = snap.path(["M" + courtW, trippleD, "L" + (courtW - (trippleX + lbD + basketD + basketR)), trippleD, "A" + trippleR, trippleR, 0, 0, 0, (courtW - (trippleX + lbD + basketD + basketR)), courtH - trippleD, "L" + courtW, courtH - trippleD].join(" "));
	rightTripple.attr(attr);


	var fqW = 5.8 * ratio;
	var fqH = 4.9 * ratio;
	var leftFqRect = snap.rect(0, (courtH - fqH) / 2, fqW, fqH);
	leftFqRect.attr(attr);
	var rightFqRect = snap.rect(courtW - fqW, (courtH - fqH) / 2, fqW, fqH);
	rightFqRect.attr(attr);

	var leftFqCircle = snap.circle(fqW, courtH / 2, 1.8 * ratio);
	window.leftFqRect = leftFqCircle;
	leftFqCircle.attr(attr);
	var rightFqCircle = snap.circle(courtW - fqW, courtH / 2, 1.8 * ratio);
	rightFqCircle.attr(attr);



	// var lbW = 1.8 * ratio;
	// var lbD = 1.2 * ratio;
	var leftLb = snap.line(lbD, (courtH - lbW) / 2, lbD, courtH / 2 + lbW / 2);
	leftLb.attr(attr);
	var rightLb = snap.line(courtW - lbD, (courtH - lbW) / 2, courtW - lbD, courtH / 2 + lbW / 2);
	rightLb.attr(attr);

	// var paintR = 1.25 * ratio;
	// var basketD = 0.225 * ratio;
	// var basketR = 0.45 * ratio;
	// var leftBasketD = snap.line(lbD, courtH / 2, lbD + basketD, courtH / 2);
	leftBasketD.attr(attr);
	var rightBasketD = snap.line(courtW - lbD, courtH / 2, courtW - lbD - basketD, courtH / 2);
	rightBasketD.attr(attr);
	var leftBasket = snap.circle(lbD + basketD + basketR, courtH / 2, basketR);
	leftBasket.attr(attr);
	var rightBasket = snap.circle(courtW - lbD - basketD - basketR, courtH / 2, basketR);
	rightBasket.attr(attr);

	var leftPaint = snap.path(["M" + lbD, (courtH - paintR * 2) / 2, "L", lbD + basketD + basketR, (courtH - paintR * 2) / 2, "A" + paintR, paintR, 0, 0, 1, lbD + basketD + basketR, courtH / 2 + paintR, "L" + lbD, courtH / 2 + paintR].join(" "));
	leftPaint.attr(attr);
	var rightPaint = snap.path(["M" + (courtW - lbD), (courtH - paintR * 2) / 2, "L", courtW - lbD - basketD - basketR, (courtH - paintR * 2) / 2, "A" + paintR, paintR, 0, 0, 0, courtW - lbD - basketD - basketR, courtH / 2 + paintR, "L" + (courtW - lbD), courtH / 2 + paintR].join(" "));
	rightPaint.attr(attr);


	// var ballImage = snap.image("img/ball.png", courtW / 2 + 20, 30, basketR * 2, basketR * 2);
	var ball = snap.path(["M" + (courtW / 2 + 20), 30, "A" + basketR, basketR, 0, 0, 1, courtW / 2 + 20, 30 + basketR * 2, "A" + basketR, basketR, 0, 0, 1, courtW / 2 + 20, 30].join(" "));
	ball.attr({
		strokeWidth: 3,
		fill: 'blue',
		stroke: '#555'
	});
	ball.animate({
		d: ["M" + (courtW - basketD - lbD - basketR), courtH / 2 - basketR, "A" + basketR, basketR, 0, 0, 1, courtW - basketD - lbD - basketR, courtH / 2 + basketR, "A" + basketR, basketR, 0, 0, 1, courtW - basketD - lbD - basketR, courtH / 2 - basketR].join(" ")
	}, 2500, mina.easeinout, function() {
		ball.animate({
			fill: 'red',
			stroke: '#000',
			strokeWidth: 1
		}, 500, mina.bounce);
	});



})();

