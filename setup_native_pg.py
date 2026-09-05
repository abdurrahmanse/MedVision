import asyncio
import asyncpg

async def main():
    try:
        conn = await asyncpg.connect("postgresql://abdurrahman@127.0.0.1:5432/postgres")
        # Check if medvision database exists
        exists = await conn.fetchval("SELECT 1 FROM pg_database WHERE datname = 'medvision'")
        if not exists:
            await conn.execute("CREATE DATABASE medvision")
            print("Created medvision database!")
        else:
            print("medvision database already exists.")
        await conn.close()
    except Exception as e:
        print(f"Error: {repr(e)}")

asyncio.run(main())
