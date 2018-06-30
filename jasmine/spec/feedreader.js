/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        // allFeeds are defined and have at least 1 feed.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds).toBeTruthy();  // toBeTruthy(): some.length !== 0
        });

        // allFeed has a URL defined and that the URL is not empty.
        it('has a URL defined and that the URL is not empty', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();  // toBeTruthy(): some.length !== 0
            };
        });

        // allFeed has a name defined and that the name is not empty.
        it('has a name defined and that the name is not empty', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy(); // toBeTruthy(): some.length !== 0
            };
        });
    });

    describe('The menu', function() {
        // The menu element is hidden by default.
        it('element is hidden by default', function() {
            expect(document.body.className).toBe('menu-hidden');
        });

        // The menu changes visibility when the menu icon is clicked.
        it('changes visibility when the menu icon is clicked', function() {
            let menuIcon = document.body.querySelector('.header .menu-icon-link');
            let prevClass = document.body.className;
            let newClass;

            menuIcon.addEventListener('click', function() {
                newClass = document.body.className;
            });
            expect(prevClass).not.toBe(newClass);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // When the loadFeed function is called, there is at least a single .entry element within the .feed container.
        // loadFeed() is asynchronous so this test require the use of Jasmine's beforeEach.
        it('has at least a single .entry element within the .feed container', function() {
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        let prevfeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                prevfeed = document.getElementsByClassName('feed')[0].innerHTML;
                loadFeed(1, done);  // Load a new feed
            });
        });

        // When a new feed is loaded by the loadFeed function, the content actually changes.
        it('changes the content', function() {
            let newFeed = document.getElementsByClassName('feed')[0].innerHTML;
            // Compare the new feed and previous feed
            // They should be different in order to pass.
            expect(newFeed).not.toEqual(prevfeed);
        });
    });
});
