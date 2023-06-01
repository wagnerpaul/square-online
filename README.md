# square-online


# two helpful commands to test scripts locally with square online
Use npm http-server to serve this directory.
> https://www.npmjs.com/package/http-server

```sh
npx http-server
```

Use localtunnel to proxy it to the public.
> https://localtunnel.github.io/www/

```sh
lt -p 8080
```

# Ideas

1. automatically hide items marked out of stock in the select element `$('.form-item select option:disabled').remove()`
This is likely to work because of a few things:
	- items marked out of stock are not pruchasable online
	- items marked out of stock are purchasable at POS
	- items with one variant don't have a select
	- may need to check to see if one variant only exists and update selection and remove options all together
	- deal killer is price range is shown on category page and pdp that INCLUDES disabled items
	- create localtunnel server for personal use https://hub.docker.com/r/defunctzombie/localtunnel-server

	<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/wagnerpaul/square-online@v1.5.0/VolumeCalc.js"></script>