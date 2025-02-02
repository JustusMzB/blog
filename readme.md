# My Blog/Website
This is the Repo for my current Blog/Website.
It is currently hosted at [justusmzb.tech](https://justusmzb.tech) and [justusmzb.de](https://justusmzb.de), using an S3 Bucket and Cloudfront Distribution.
The Website is built using [Hugo](https://gohugo.io/), a static site generator, and the [PaperMod-Theme](https://github.com/adityatelange/hugo-PaperMod).

## How to run the Website locally
1. Clone the Repo
2. Install Hugo
3. Run `hugo server -D` in the root directory of the Repo

## How to deploy the Website
1. Clone the Repo
2. Install Hugo
3. Configure your S3-Bucket and Cloudfront Distribution on AWS and in hugo.yaml
4. Make sure you have aws-cli configured with valid credentials
5. Run `hugo && hugo deploy` in the root directory of the Repo
