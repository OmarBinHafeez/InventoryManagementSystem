# InventoryManagementSystem
This is online inventory management application with Angular, ASP.NET Core and SqlServer following the principles of Clean Architecture. It has the following functionalities </br> 
 * User can add, edit and delete Products</br>
 * User can add, edit and delete Sales</br>
 * User can add, edit and delete Purchases</br>

## Technologies

* ASP.NET Core 7.0
* Entity Framework Core 7.0.17
* Angular 17
* Sql Server
* Bootstrap

## Development Environment Ready

1. Install Latest [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. Install Latest [Visual Studio](https://visualstudio.microsoft.com/downloads/)
3. Install the latest [.NET Core 7.0 SDK](https://dotnet.microsoft.com/download/dotnet-core/7.0)
4. Install the latest [Node.js LTS](https://nodejs.org/en/)
5. Run `npm install -g @angular/cli` to install latest version of angular CLI
6. Download source code from  `https://github.com/OmarBinHafeez/InventoryManagementSystem` 

## Run Front-End Application (Angular 17)

1. Navigate to the workspace folder, such as `UmarApp-UI`.
2. Open terminal window
3. Run `npm install` to install all dependencies used in application.
4. Run `npm start` to run chat application in browser.
5. Browse `http://localhost:4200` to view chat app in browser

## Database Configuration

The Application uses data-store in SQL Server.

Update the **DefaultConnection** connection string within **UmarAppApi/appsettings.json** , so that application can point to a valid SQL Server instance. 

```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=UmarInventory; Trusted_Connection=True; MultipleActiveResultSets=True;"
  },
```

When you run **update-database** command, the migrations will be applied and the database will be automatically created.


### Front-End (Anuglar 17)

Front-end is a single page application based on angular 17. This only communicates with restfull api layer to store or retrieve data.

