set -eu

for file in lib/classes/*.js; do
    [ -e "$file" ] || continue
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done

for file in lib/interfaces/*.js; do
    [ -e "$file" ] || continue
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done

for file in lib/types/*.js; do
    [ -e "$file" ] || continue
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done

for file in lib/utils/*.js; do
    [ -e "$file" ] || continue
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done

for file in lib/*.js; do
    [ -e "$file" ] || continue
    npx uglifyjs "$file" --compress --mangle --output "$file"
    echo minified: "$file"
done
