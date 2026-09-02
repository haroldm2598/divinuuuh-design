export default function Unauthorized() {
    return (
        <main className=" flex flex-1 flex-col items-center justify-center space-y-4 p-6 text-center text-2xl">
            <h1>401 - Unauthorized</h1>
            <p>You are not authorized to access this resource.</p>
        </main>
    );
}
