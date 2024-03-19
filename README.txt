This project grabs power usage data from a remote site, and also generates fake entries into pocketbase backend database. The frontend is made in Svelte and requests from the backend api the entries and displays them in a sheet or chart.

## Backend

The backend is written in nodejs and uses the pocketbase module to populate content.

## Database

The database automatically populates its own schema from pb_migrations with the collections snapshot in JS.

## frontend

The frontend is statically served by Caddy and backed by the database backend where entries are live updating in the sheets tab.