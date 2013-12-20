"use strict";

Array.prototype.clone = function() {
	return this.slice(0);
};

String.prototype.slugfy = function() {
	var str = this.toString();
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
	var to   = "aaaaaeeeeeiiiiooooouuuunc------";
	for (var i=0, l=from.length ; i<l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	.replace(/\s+/g, '-') // collapse whitespace and replace by -
	.replace(/-+/g, '-'); // collapse dashes

	return str;
};

Function.prototype.bind = function(context) {
	var __method = this,
	args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var a = Array.prototype.concat(Array.prototype.slice.call(arguments), args);
		return __method.apply(context, Array.prototype.slice.call(a));
	}
};

var main = {
	// data to display
	// content, count, name
	data: [{name: "São Paulo", count: 10, content: "Teste"}, {name: "Moscow", count: 12, content: "<p>Moscow is the capital city and the most populous federal subject of <b>Russia</b>. The city is a major political, economic, cultural and scientific center in Russia and in Eurasia.</p>"}, {name: "Amsterdam", count: 25, content: "<p>Amsterdam is the capital and most populous city of the <b>Netherlands</b>. Its status as the Dutch capital is mandated by the Constitution of the Netherlands though it is not the seat of the Dutch government, which is at the Hague. </p>"}, {name: "Lisbon", count: 15, content: "<p>Lisbon is the largest city and capital of <b>Portugal</b> with a population of 547,631 within its administrative limits on a land area of 84.8 square kilometers.</p>"}, {name: "Berlin", count: 19, content: "<p>Berlin is the capital city of <b>Germany</b> and one of the 16 states of Germany. With a population of 3.3 million people, Berlin is Germany's largest city and is the second most populous city proper and the seventh most populous urban area in the European Union.</p>"}, {name: "Madrid", count: 25, content: "<p>Madrid is the capital of <b>Spain</b> and its largest city. The population of the city is roughly 3.3 million and the entire population of the Madrid metropolitan area is calculated to be around 6.5 million.</p>"},{name: "Barcelona", count: 10, content: "<p>Barcelona is a Spanish city, capital of the autonomous community of Catalonia and the second largest city in the country, with a population of 1,620,943 within its administrative limits.</p>"}, {name: "Zagreb", count: 27, content: "<p>Zagreb is the capital and the largest city of the Republic of <b>Croatia</b>. It is located in the northwest of the country, along the Sava river, at the southern slopes of the Medvednica mountain.</p>"}, {name: "Singapore", count: 30, content: "<p>Singapore, officially the Republic of Singapore, is a Southeast Asian sovereign city-state off the southern tip of the Malay Peninsula, 137 kilometers north of the equator.</p>"}, {name: "Beijing", count: 14, content: "<p>Beijing, sometimes romanized as Peking, is the capital of the People's Republic of China and one of the most populous cities in the world. The population as of 2012 was 20,693,000.</p>"}, {name: "Paris", count: 5, content: "<p>Paris is the capital and most populous city of <b>France</b>. It is situated on the River Seine, in the north of the country, at the heart of the Île- de-France region.</p>"}],
	init: function(){
		// elements
		this.cityContent = document.getElementById('city-content');
		this.column1 = document.getElementById('column1');
		this.column2 = document.getElementById('column2');
		this.column3 = document.getElementById('column3');

		this.sortList();
		this.splitList();

		main.cityContent.innerHTML = "<h3>"+this.data[0].name+"</h3>" + this.data[0].content;
	},
	sortList: function(){
		this.data.sort(function (a, b) {
			if (a.name.slugfy() > b.name.slugfy())
				return 1;
			
			if (a.name.slugfy() < b.name.slugfy())
				return -1;

			return 0;
		});
	},
	splitList: function(){
		var columns = 3,
			total = this.data.length,
			perColumn = Math.floor(total/columns),
			rest = total%columns;

		if (rest > 0) {
			perColumn++;
		}

		for(var i = 0; i<3; i++) {
			var tempData = this.data.clone(),
				items = tempData.splice(i*perColumn, perColumn),
				list = this._createList(items)
			
			this['column'+(i+1)].appendChild(list);
		}

	},
	_createList: function(items){
		var list = document.createElement("ul");

		for(var i = 0; i<items.length; i++) {
			var item  = document.createElement("li"),
				link = document.createElement("a"),
				linkContent = document.createTextNode(items[i].name),
				itemContent = document.createTextNode(" (" + items[i].count + ")");

			link.setAttribute('href', 'javscript:void(false);');

			link.onclick = function(){
				main.cityContent.innerHTML = "<h3>"+this.name+"</h3>" + this.content;
			}.bind(items[i]);

			link.appendChild(linkContent);
			item.appendChild(link);
			item.appendChild(itemContent);

			list.appendChild(item);
		}

		return list;
	}
};

window.onload = function(){
	main.init();
};
