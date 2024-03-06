for file in lib/classes/*.js; do
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done

for file in lib/interfaces/*.js; do
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done

for file in lib/types/*.js; do
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done

for file in lib/utils/*.js; do
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done

for file in lib/*.js; do
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done