css-de-dup
==========

Check your CSS files for duplicate ids and classes.

* Checks all of the css files within a given folder for repeating ids or classes.
* STRICT_MATCH flag allows you to look for exact duplicates or just for matching signatures.
* Prints out a list of files and their duplicate ids or classes.
* Does not compare across CSS files, this is intentional.


Sample Call
===========


    node main.js [DIR] [STRICT_MATCH]
    console.log("node main.js '../aiddata-dashboards/css/aiddataui/' true");


Parameters
==========

DIR - path, to folder containing all of the CSS files you want to parse.
STRICT_MATCH - boolean, whether to look for exact matches of both signature and properties, or if false just look for matching signatures.
