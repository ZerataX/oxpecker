var ox_config = require('./oxpecker.config.js');

var endpoint_url = "https://translation.googleapis.com/language/translate/v2?key=" + ox_config.api_key;
var ox_target_language = ox_config.ox_target_language;

var browser_language = (window.navigator.languages && window.navigator.languages[0]).split("-")[0];

var ox_target_contents_list = $(".status__content").not($(".ox-flagged")).not($(".status.muted .status__content"));

var ox_translation_button_template = document.createElement("A");
     ox_translation_button_template.innerHTML = "文/A";
     ox_translation_button_template.style.cssText = "background-color:#606984;color:#393f4f;font-weight:bold;cursor:pointer;line-height:1.25em;padding:0.3em;border-radius:0.5em;margin-left: 18px; float: right; position: relative; top: -24px;font-size:0.75em";

ox_target_contents_list.each(function(i){
     var ox_target_content = ox_target_contents_list[i]
     var mysource = ox_target_content.textContent;
     var translated = "init";
     var ox_translation_button = ox_translation_button_template.cloneNode(true);

     var translation_anchor = document.createElement("DIV");
          translation_anchor.id = "translation_" + Math.round( Math.random()*1000 );
     var target_id = translation_anchor.id;
     ox_target_content.appendChild(translation_anchor);
     ox_target_content.classList.add("ox-flagged");

     ox_target_content.parentNode.appendChild( ox_translation_button );
     ox_translation_button.addEventListener('click', function(){
          console.log('started');
          $.ajax({
                         type:     "GET",
                    dataType:      "jsonp",
                    url: endpoint_url,
                    data:{
                              q: mysource,
                         target: ox_target_language,
                    }
               }).then(
                    function(json){
                         console.log( json.data.translations[0].translatedText );
                         $("#"+target_id).after( json.data.translations[0].translatedText );
                    },
                    function(){
                         console.log('error');
                    }
               )
     }    
     , false);
})
