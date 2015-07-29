(function(){
	var i;
	// var total = 500;
	var totalpeople = 32875;
	var othernumber = 100;
	var numbers = {'man':0,'woman':0, 
						'highlight': {'man':0,
									'woman':0}

					};
	var man = '<img class = "figure animated bounceIn" src = "img/man.svg">';
	var woman = '<img class = "figure animated bounceIn" src = "img/woman.svg">';
	var hwoman = '<img class = "figure animated bounceIn" src = "img/woman-h.svg">';
	var hman = '<img class = "figure animated bounceIn" src = "img/man-h.svg">';
	var hwork = '<img class = "figure work animated bounceIn" src = "img/work-h.svg">';
	var work = '<img class = "figure work animated bounceIn" src = "img/work.svg">';



	var com = 'For every 100 people, there '

	var usingnum;

	var s;

	$('#reset').on('click',function(){
		$('#menu').css({'display':'block'})
		$('#results').css({'display':'none'});
	})

	d3.csv ('data/racegender.csv', function(error, racegender){
		d3.csv ('data/rolegender.csv', function(error, role){
			console.log(racegender);
			console.log(role)
			$('#submit').on('click',function(){
				domath();
				bakeresults();
			});

			racegender.forEach(function(d){
				d.roundp = Math.round(d.percentage).toString();
			})

			function domath(){
				numbers = {'man':0,'woman':0, 
						'highlight': {'man':0,
									'woman':0}}
				var gender = $('#gender').val();
				var race = $('#race').val();
				console.log(gender)
				console.log(race)
				usingnum = _.findWhere(racegender,{'race':race,'gender':gender})
				console.log(usingnum);
				numbers.man = _.findWhere(racegender,{'race':'Total','gender':'Male'}).roundp
				numbers.woman = _.findWhere(racegender,{'race':'Total','gender':'Female'}).roundp
				if (usingnum.gender==='Male'){
					numbers.highlight.man = Number(usingnum.roundp)
					numbers.man = numbers.man-numbers.highlight.man;
				}

				if (usingnum.gender==='Female'){
					numbers.highlight.woman = Number(usingnum.roundp)
					numbers.woman = numbers.woman-numbers.highlight.woman;
				}

				if (usingnum.gender==='Total'){
					runtotalcal();
				}

				console.log(numbers)



			}
			
			function bakeresults (){
				$('#visual').html('');
				$('#commentary').html('');
				var gender = $('#gender').val();
				var race = $('#race').val();
				usingnum = _.findWhere(racegender,{'race':race,'gender':gender})
				console.log(usingnum);
				$('#menu').css({'display':'none'})
				$('#results').css({'display':'block'});

				if (gender == 'Total' && race == 'Total'){
					$('#visual').html('');
					$('#commentary').html('');
					var sentence = "Since you didn't choose an option, here is a fact.<span>For every 100 newsrooms, </span><span class = 'highlight'>63</span> have at least one woman among top three editors."
					var tweet = 'For every 100 newsrooms, 63 have at least one woman among top three editors.'
					$('#commentary').append(sentence)
					for (i = 1; i<=63; i++){
						$('#visual').append(hwork);
					}
					for (i = 1; i<=37; i++){
						$('#visual').append(work);
					}

					var tweettext = "https://twitter.com/intent/tweet?" + "url=http://www.poynter.org&via=poynter&text="+tweet;

				$('#hyperlink').attr('href',tweettext)

				} else {

					// $('.figure').addClass('animated bounceIn')
				for (i = 1; i<=numbers.highlight.woman; i++){
					$('#visual').append(hwoman);
				}
				for (i = 1; i<=numbers.highlight.man; i++){
					$('#visual').append(hman);
				}

				for (i = 1; i<=numbers.man; i++){
					$('#visual').append(man);
				}
				for (i = 1; i<=numbers.woman; i++){
					$('#visual').append(woman);
				}

				if (usingnum.roundp == '1'){
					var isare = 'is';
					s = ''
				} else {
					var isare = 'are';
					s = 's'
				}

				if (usingnum.gender=='Total'){
					usingnum.gender='people'
					s = ''
				}

				if (usingnum.gender=='Total' && usingnum.roundp == '1'){
					usingnum.gender='person';
				}

				if (usingnum.race=='Total'){
					usingnum.race=''
				}

				var sentence = '<span>'+com+'</span>'+isare+' '+ '<span class = "highlight">'+usingnum.roundp +' '+usingnum.race+' '+usingnum.gender.toLowerCase()+s+'</span> in the newspaper industry.'
				var tweet = com + isare + ' ' + usingnum.roundp +' '+usingnum.race+' '+usingnum.gender.toLowerCase()+s+' in the newspaper industry.'
				$('#commentary').append(sentence)

				var tweettext = "https://twitter.com/intent/tweet?" + "url=http://www.poynter.org&via=poynter&text="+tweet;

				$('#hyperlink').attr('href',tweettext)

				}
				
				
			}

			function runtotalcal(){
				numbers.highlight.man = Number(_.findWhere(racegender,{'race':usingnum.race,'gender':'Male'}).roundp)
				numbers.highlight.woman = Number(_.findWhere(racegender,{'race':usingnum.race,'gender':'Female'}).roundp)
				numbers.man = numbers.man-numbers.highlight.man;
				numbers.woman = numbers.woman-numbers.highlight.woman;
			}

		});
	});

}).call(this);