!function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}(),jQuery(document).ready(function(a){function b(a,b){return Math.floor(Math.random()*(a-b+1))+b}function c(){j.each(function(){var c=b(10,1);a(this).html(c).attr("data-celltype",c)}),d()}function d(){for(var a,c=["a","b","c"],d=[],h=0;h<c.length;){if(a=b(100,1)-1,0===h){var i=a,l=a+1;k.attr("data-currentcell",l)}d.indexOf(a)<=-1&&(d.push(a),j.eq(a).html(c[h]).attr("data-celltype",c[h]).addClass("cell_special"),h++)}e(i),f(i),g()}function e(a){j.eq(a).addClass("grid_cell-current")}function f(a){var b=j.eq(a),c=b.prev(),d=b.next(),e=parseInt(b.attr("data-cell"));console.log("startPos: "+a+" | currentRowPos: "+e),console.log("currentPrev:"),console.log(c),console.log("currentNext:"),console.log(d),console.log(1===e?"you cannot go left":10===e?"you cannot go right":"you can travel both left and right")}function g(){j.on("click",function(){var b=a(this).attr("data-celltype");if(isNaN(b))var c=m["celltype_"+b];else var c=l["celltype_"+b];return h(c,b),!1})}function h(b,c){a("#stats_type").html(b.type),a("#stats_content").html(b.content),a("#stats_num").html(c)}var i=(a("html"),a("body"),a(document),a(window)),j=a("td.grid_cell"),k=a("#map_grid"),l={celltype_1:{type:"empty",content:"Take the train to candy land."},celltype_2:{type:"ship",content:"Sponge shoppin' for a brand new Springfield."},celltype_3:{type:"junkyard",content:"Look at all those chickens!"},celltype_4:{type:"debris field",content:"Holy shit! A fucking debris field!"},celltype_5:{type:"blackhole",content:"You will never escape. You will never find love."},celltype_6:{type:"stranded citizen",content:"Help this helpless citizen! Or kill him and loot his stuff."},celltype_7:{type:"bandits",content:"Bandits are attempting to hijack your ship! They are not looking for a fight."},celltype_8:{type:"battle",content:"There is a doin's a-transpirin'! Take part in the battle or slip on past?"},celltype_9:{type:"trading post",content:"Well look here partner, this be a tradin' post, shuck-a-muck!"},celltype_10:{type:"corn diamond",content:"You found the lethal corn diamond! Disperse!"}},m={celltype_a:{type:"stardock",content:"This is your spawn point. Cherish it forever."},celltype_b:{type:"light bank",content:"Where all your legal financial transactions take place."},celltype_c:{type:"dark bank",content:"Criminal shit goes on here. Its like the Omega in Mass Effect."}};i.load(function(){c()})});
//# sourceMappingURL=scripts.map