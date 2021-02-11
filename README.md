# SPEC feedback

## Question :

### After having read the API documentation, is there anything that jumps out as a potential issue?

    0) Fullscreen is specified as a target layout but there is a shadow for the post card?  BTW, fullscreen is not a definitive spec these days. I've implemented two options - portrait and a landscape by keeping the same 'golden sect' for both but orient them differently for optimal image expo.

    1) Vertical blue delimiter between image and details - is it just a bound or a splitter with the ability to change post card's layout?

    2) Blurred image back - perhaps this is a hint for some image effect on switch

    3) Is it mandatory to format pub date in Italian? 

    4) How to handle missing data?

    5) How to expose an error situation? I've added a simple screen as a first step.

    5) How to indicate loading/pending situation to end-user? I've added an indefinite circular spinner for the start.

## After implementation feedback:

### Did you encounter any issues during the implementation? If so, were you able to bypass them?

    0) post and media both contain attribute 'likes' which may lead to incoherence - which one should be used for UI?

    1) offset and limit params in API media get method spec (OpenApi) are appear to be spare (at least if an ID is unique; if it is not - there is another problem - misidentification).

    2) media fetching by id seems buggy - returns media with an id that does not equal requested one (check included jpg) - I've added an extra attribute to keep a mapping between posts and media.

    3) I've started to get 500 on post requests so had to pause tweaks and tests. I've cached API response types for future mocks to continue on tests if the API service will not come up short.

### Looking closely at the response of the API, do you think there is another way to implement the app? If yes, what other option could exist ? If no, why not ?

    Looking at it as a whole and meaning real data schemes I would consider GraphQL.

### If you were in direct contact with the API service team, what could you ask them to do to make your life easier or optimize the performances ?

    0) Just add missing attrs to the post records to make it sufficient to fetch only post records. Data lookups to User and Media attrs just put slowdown things considerably.

    1) I would unify refs in Api requests - i.e. use user_Id for user lookup insted of user_name - just like for image.
    Uniformity reduces the number of human errors.

### What was the most difficult part of the implementation for you and why ?
    HTML design part because I used to develop quite different things. My current project is Electron-based. The UI part is mostly finished a couple of months ago and now I am mostly on business logic. Moreover, I don't keep hundred font outlines in my mind to instantly detect font names out of an image.
    I know the drill but HTML/CSS related skills just aren't currently at my fingertips.

### On a scale of 1 to 10, are you satisfied with the result ? Is there anything that needs more attention ?

    Abstract digits mean not too much 
        - what is 0? 
        - what is 5?
        - what is 10?

    Taking scope - it's about 30% of initially planned.
    Taking code quality in terms of brevity/simplicity - there is always an option to cut something out and streamline obstacles - especially with react.

    
    This is just a quick and dirty implementation. While the task looks typical in major parts, I always try to find simpler approaches/code idioms. As for further works, I would notice:

### How long did it take you to implement this development ? Was it longer or shorter than what you   initially expected ?

    ~ 0.5h - Initial spec review, check URLs
    ~ 3.5h - HTML/CSS designing - I would spend less than an hour on this if having design assets   prepared proper way (Figma | Zeplin)
    ~ 2h   - initial React draft - 4 screens, mocked data
    ~ 2h   - API connect, debug, minor refactoring
    ~ 1h   - This spec
    ~ 0.5h - Cleanup and git

    Overall, I had no preliminary estimates and treat this as a small hackathon to switch from daily routine which is always refreshing.

# Extra notes:

## Implementation notes & improvements:

    0) A bitmap is not optimal for design communications - I would use Figma or Zeplin.

    1)  Data, that accessed most often, can be cached in localstorage (size limit is about 5MB)

    2) Access hash is not normally stored in sources - it comes from an API as a result of
        of successful user auth (typical approach - JWT block).
        So to make code work pls fill the access key in app/src/config/api.js file.

    3) Pls tolerate several data files (models & img) for development purposes and tests that should be there.

    4) what should be done in a real app but missed here (the list is not exhaustive):
        - Accessibility - ARIA attrs and other means
        - SEO means - Server Side Rendering for posts - if indexation is desirable.
        - Caching management (PWA) for faster loads
        - unit and e2e tests - should be there for sure but the real implementation does not fit in my free time budget unf right now.
        - real but not bootstrapped project toolchain configuration - ex: make code analysis (linting, formatting) on commit via git hooks 
        - typescript is a choice for real projects but here its overkill
        - for an app with many screens I would use a dedicated data store like redux, for this one passing data via props and hooks does just fine.

    5) data fillers for the case of data absence (loading and error screens are added)

    6) Internationalization / Localization 


Thanks in return )