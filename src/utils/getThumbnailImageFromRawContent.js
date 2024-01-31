// Use regex to extract the value inside the src attribute
const regex = /<img.*?src=["'](https:\/\/[^"']+)["'].*?>/i;

export default function (content = "") {
    const match = content.match(regex);
    return match ? match[1] : null;
}