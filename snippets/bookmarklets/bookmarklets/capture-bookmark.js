
let fileName;
let domain
init()

console.log( '',  );

function init() {

	let path = location.protocol === "file:" ? "../../" : "https://theo-armour.github.io/snippets/bookmarklets/";

	if (!window.divCaptureBookmark) {

		style = document.body.appendChild(document.createElement('style'));
		style.innerText =
			`
			a { color: blue; opacity: 0.85 }
			.titleCBM { color: green; display:inline-block; margin: 0.5rem 0 0 0; width: 7rem; }
			.inputCBM { width:20rem; }

			#divCaptureBookmark {background-color: white; border: 1px solid red; max-height: 90%; width: 350px; opacity: 0.95;
				overflow: auto; padding:  10px; position: fixed; right: 30px; resize: both; top: 20px; z-index:100000; }

		`;

		divCaptureBookmark = document.body.appendChild(document.createElement('div'));
		divCaptureBookmark.id = "divCaptureBookmark";

	} else {

		divTooToo.hidden = false;

	}


	styleCBM = document.body.appendChild(document.createElement('style'));
	styleCBM.innerText =
		`

	`

	divCaptureBookmark.style.width="30rem";

	const date = new Date().toISOString();


	const htm =
	`
		<div class=titleCBM >title: </div><input id=inpTitle class=inputCBM oninput=updateJson() value="${ document.title }" >

		<div class=titleCBM >url: </div><input id=inpUrl class=inputCBM value="${ location.href }" >

		<div class=titleCBM >filename: </div><input id=inpFileName class=inputCBM value="${  getFileName() }" >

		<div class=titleCBM >favicon: </div><input id=inpFavicon class=inputCBM >

		<div class=titleCBM >images: </div><input id=inpImages class=inputCBM>

		<div class=titleCBM >uuid: </div><input id=inpUuid class=inputCBM  value="${ getUuidv4() }" >

		<div class=titleCBM >date:</div><input id=inpDateAdd style=width:12rem; value="${ date }" >

		<br>

		<div class=titleCBM >tags: </div><textarea id=txtTags style=width:100%; ></textarea>

		<div class=titleCBM >description: </div><textarea id=txtDescription style=width:100%; ></textarea>

		<div class=titleCBM >json: </div><textarea id=txtJson style=height:15rem;width:100%; ></textarea>

		<button onclick=saveFile(); >save</button>
	`;

	divCaptureBookmark.innerHTML = htm;

	inpFavicon.value = `https://www.google.com/s2/favicons?domain=${ document.domain }`;

	updateJson();

}

function updateJson() {


	const tags = `["${ txtTags.value.slice().replace( /,/g, '","') }"]`;

	console.log( 'document.lastModified', document.lastModified );

	const txt =
`{
"url": "${inpUrl.value }",
"title": "${ inpTitle.value }",
"name": "${ inpFileName.value }",
"dateAdd": "${ inpDateAdd.value }",
"dateUpdate": "${ inpDateAdd.value }",
"id": "${ inpUuid.value }",
"type": "url",
"images": [ ${ inpImages.value } ],
"favicon": "${ inpFavicon.value }",
"tags": ${ tags },
"description": "${ txtDescription.value }"
}`;

	txtJson.value = txt;

}


function getFileName() {

	console.log( '', location );

	console.log( '', location.domain );

	domain = document.domain ? document.domain.replace( /\./g, "-") : "file"
	const title = document.title ? document.title.replace( / /g, "-") : ""
	fileName = domain + "-" + title + ".json";

	return fileName;

}


function getUuidv4() {

	return ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace( /[018]/g, c =>
		( c ^ crypto.getRandomValues( new Uint8Array( 1 )  )[ 0 ] & 15 >> c / 4 ).toString( 16 )
	)

}

function saveFile() {

	//const strings = BOP.jsonLines.map( jsonl => JSON.stringify( jsonl ) ).join( "\n" );

	const strings = txtJson.value;
	//console.log( 'str', strings );

	const blob = new Blob( [ strings ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = fileName;
	a.click();
	a = null;

}