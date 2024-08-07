(function() {
    var tabbedTOC = {
        blogUrl: "",
        containerId: "tabbed-toc",
        activeTab: 1,
        showDates: false,
        showSummaries: false,
        numChars: 200,
        showThumbnails: false,
        thumbSize: 40,
        noThumb: "http://3.bp.blogspot.com/-vpCFysMEZys/UOEhSGjkfnI/AAAAAAAAFwY/h1wuA5kfEhg/s72-c/grey.png",
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        newTabLink: true,
        maxResults: 99999,
        preload: 0,
        sortAlphabetically: true,
        showNew: 7,
        newText: " - <em style='color:blue;'>Nuevo!</em>",
        loadFeed: function() {
            var script = document.createElement("script");
            script.src = tabbedTOC.blogUrl + "/feeds/posts/summary?alt=json-in-script&max-results=" + tabbedTOC.maxResults + "&callback=tabbedTOC.parseFeed";
            document.body.appendChild(script);
        },
        parseFeed: function(json) {
            var entries = json.feed.entry;
            if (!entries) return;
            var tocContainer = document.getElementById(tabbedTOC.containerId);
            var tabContents = [], postTitle, postUrl, postDate, postContent;
            for (var i = 0; i < entries.length; i++) {
                postTitle = entries[i].title.$t;
                postUrl = entries[i].link.filter(function(link) {
                    return link.rel === 'alternate';
                })[0].href;
                postDate = new Date(entries[i].published.$t);
                postContent = tabbedTOC.showSummaries ? entries[i].summary.$t.substring(0, tabbedTOC.numChars) + '...' : '';
                tabContents.push("<li><a href='" + postUrl + "'" + (tabbedTOC.newTabLink ? " target='_blank'" : "") + ">" + postTitle + "</a>" + (tabbedTOC.showDates ? " - " + postDate.toLocaleDateString() : "") + (tabbedTOC.showSummaries ? "<p>" + postContent + "</p>" : "") + "</li>");
            }
            tocContainer.innerHTML = "<ul>" + tabContents.join("") + "</ul>";
        },
        init: function() {
            tabbedTOC.blogUrl = tabbedTOC.blogUrl || document.location.origin;
            tabbedTOC.loadFeed();
        }
    };
    tabbedTOC.init();
})();
