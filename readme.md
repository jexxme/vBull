Hiya! TBC!

## Adding a new Canvas
### Prerequesites
Make sure the p5 library is linked in head of the HTML file. Bare in mind that this structure to get the file is designed to work with flask.
``` html
<script src="{{ url_for('static', filename='/libs/p5/p5.min.js') }}"></script>
```
Alternatively this may be swapped with the p5 CDN: ``https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js``.

Make sure the sketch is linked in the head of the HTML file.
``` html
<script src="{{ url_for('static', filename='/p5_sketches/example.js') }}"></script>
```



### Adding the actual canvas
First off, add a div with the class ``canvas-container`` to your file. Inside you may add new divs. Any div with class ``p5canvas`` and an assigned ``cname`` (company name) will be treated as a new canvas.
``` html
<div class="canvas-container">
    <div id="canvasID" class="p5canvas" cname="TechCorp"></div>
</div>
```

Secondly, add an entry in your sketch file for the newly added company.
Bare in mind that the ``canvasID`` needs to match the id set in the div in the step above. The argument ``s`` is the sketch defined in ``example.js``.
``` js
let cTechCorp = new p5(s, 'canvasID');
```

Finally, we need to update the canvas with data from the backend on every 'stock_price' event of the socket. The new stock value is passed into the ``_step()``-method of the 'cTechCorp'-object.
``` js
socket.on('stock_prices', function (prices) {
    cTechCorp._step(prices["TechCorp"]);
}
```


