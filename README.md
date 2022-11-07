# tyro

a osu!api emulator for bancho.py that is supposed to be an optimized version of @7mochi 's tomoe repository
<br>
https://github.com/7mochi/tomoe
<br>
this by no means is supposed to be a serious competing project!
<br>
i do this so i can use more typescript (i hated every minute of this) and try to give alternative coding style options.
<br>
in the end this is all meant to be a fun thing and i try to not offend anyone with this.

### Requeriments
- Node.js v16 or higher with npm
- A running instance of bancho.py
- Access to the bancho.py database

### Usage
- Clone repository (git clone https://github.com/calemy/tyro)
- cd tyro
- npm install
- npm run build
- node index.js

### Handled routes:
```
- osu!api v1
    /get_beatmaps      : Pending
    /get_scores        : Pending
    /get_user          : Done (Missing level and ranks)
    /get_user_best     : Pending
    /get_user_recent   : Pending
    /get_match         : Not supported on bancho.py
    /get_replay        : Pending

- osu!api v2
    (Not yet implemented)
```