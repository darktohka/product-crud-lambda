build:
	echo "Building the project..."
	npm install
	rm -rf dist
	npm run build

	echo "Building the function package..."
	rm function.zip
	rm -rf node_modules
	npm install --omit=dev
	zip -r function.zip node_modules package.json package-lock.json
	(cd dist && zip -r ../function.zip .)

	echo "Cleaning up..."
	rm -rf node_modules
	npm install