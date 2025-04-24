build:
	echo "Building the project..."
	npm install
	rm -rf dist
	npm run build
	rm function.zip
	zip -r function.zip node_modules package.json package-lock.json
	(cd dist && zip -r ../function.zip .)