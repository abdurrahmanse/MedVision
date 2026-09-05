import asyncio
import asyncpg

async def main():
    try:
        # Connect to their native macOS postgres which is running under their username 'abdurrahman'
        conn = await asyncpg.connect("postgresql://abdurrahman@127.0.0.1:5432/postgres")
        print("Connected to native Postgres!")
    except Exception as e:
        print(f"Native PG Error: {repr(e)}")

asyncio.run(main())
