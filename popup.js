$(document).ready(function(){
    $('body').on('click', 'a', function(){
        chrome.tabs.create({url: $(this).attr('href')});
        return false;
    });
});

var elShareLink = document.getElementById('shareLink');
elShareLink.onclick = shareCurrentTab;

var myFirebaseLinksListRef = new Firebase("https://resplendent-heat-1866.firebaseio.com/links_list");

var linksQuery = myFirebaseLinksListRef.limit(5);

linksQuery.on('child_added', function (snapshot) {
    var linkInfo = snapshot.val();

    var elLinksList = document.getElementById('linksList');
    var html = "<a href='" + linkInfo.url + "' class='list-group-item'>" + linkInfo.title + "</a>";
    html += elLinksList.innerHTML;
    elLinksList.innerHTML = html;

});

function shareCurrentTab() {
    var elSharePanel = document.getElementById('sharePanel');
    elSharePanel.classList.remove('panel-info');
    elSharePanel.classList.add('panel-success');
    elSharePanel.innerHTML = '<div class="panel-heading"><span class="glyphicon glyphicon-ok-circle"></span>\nTab shared successfully!</div>'
    chrome.tabs.getSelected(null,function(tab) {
        var tabTitle = tab.title;
        var tabUrl = tab.url;
        myFirebaseLinksListRef.push({
            author: "generic",
            title: tabTitle,
            url: tabUrl
        });
    });
    return false;
}
