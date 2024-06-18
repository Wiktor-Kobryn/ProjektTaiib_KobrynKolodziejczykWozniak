using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class pierwsza : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "USERS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USERS", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "FRIENDSHIPS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserAId = table.Column<int>(type: "int", nullable: true),
                    UserBId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FRIENDSHIPS", x => x.ID);
                    table.ForeignKey(
                        name: "FK_FRIENDSHIPS_USERS_UserAId",
                        column: x => x.UserAId,
                        principalTable: "USERS",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_FRIENDSHIPS_USERS_UserBId",
                        column: x => x.UserBId,
                        principalTable: "USERS",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "COMMENTS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    EventTaskId = table.Column<int>(type: "int", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_COMMENTS", x => x.ID);
                    table.ForeignKey(
                        name: "FK_COMMENTS_USERS_UserId",
                        column: x => x.UserId,
                        principalTable: "USERS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EVENT_TASKS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventId = table.Column<int>(type: "int", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Deadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    State = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EVENT_TASKS", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "EventTaskUser",
                columns: table => new
                {
                    EventTasksId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventTaskUser", x => new { x.EventTasksId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_EventTaskUser_EVENT_TASKS_EventTasksId",
                        column: x => x.EventTasksId,
                        principalTable: "EVENT_TASKS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventTaskUser_USERS_UsersId",
                        column: x => x.UsersId,
                        principalTable: "USERS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EVENTS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EVENTS", x => x.ID);
                    table.ForeignKey(
                        name: "FK_EVENTS_USERS_UserId",
                        column: x => x.UserId,
                        principalTable: "USERS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GROUPS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GROUPS", x => x.ID);
                    table.ForeignKey(
                        name: "FK_GROUPS_EVENTS_EventId",
                        column: x => x.EventId,
                        principalTable: "EVENTS",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "GroupUser",
                columns: table => new
                {
                    GroupsId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupUser", x => new { x.GroupsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_GroupUser_GROUPS_GroupsId",
                        column: x => x.GroupsId,
                        principalTable: "GROUPS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupUser_USERS_UsersId",
                        column: x => x.UsersId,
                        principalTable: "USERS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_COMMENTS_EventTaskId",
                table: "COMMENTS",
                column: "EventTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_COMMENTS_UserId",
                table: "COMMENTS",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EVENT_TASKS_EventId",
                table: "EVENT_TASKS",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EVENTS_GroupId",
                table: "EVENTS",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_EVENTS_UserId",
                table: "EVENTS",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EventTaskUser_UsersId",
                table: "EventTaskUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_FRIENDSHIPS_UserAId",
                table: "FRIENDSHIPS",
                column: "UserAId");

            migrationBuilder.CreateIndex(
                name: "IX_FRIENDSHIPS_UserBId",
                table: "FRIENDSHIPS",
                column: "UserBId");

            migrationBuilder.CreateIndex(
                name: "IX_GROUPS_EventId",
                table: "GROUPS",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupUser_UsersId",
                table: "GroupUser",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_COMMENTS_EVENT_TASKS_EventTaskId",
                table: "COMMENTS",
                column: "EventTaskId",
                principalTable: "EVENT_TASKS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EVENT_TASKS_EVENTS_EventId",
                table: "EVENT_TASKS",
                column: "EventId",
                principalTable: "EVENTS",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_EVENTS_GROUPS_GroupId",
                table: "EVENTS",
                column: "GroupId",
                principalTable: "GROUPS",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EVENTS_USERS_UserId",
                table: "EVENTS");

            migrationBuilder.DropForeignKey(
                name: "FK_GROUPS_EVENTS_EventId",
                table: "GROUPS");

            migrationBuilder.DropTable(
                name: "COMMENTS");

            migrationBuilder.DropTable(
                name: "EventTaskUser");

            migrationBuilder.DropTable(
                name: "FRIENDSHIPS");

            migrationBuilder.DropTable(
                name: "GroupUser");

            migrationBuilder.DropTable(
                name: "EVENT_TASKS");

            migrationBuilder.DropTable(
                name: "USERS");

            migrationBuilder.DropTable(
                name: "EVENTS");

            migrationBuilder.DropTable(
                name: "GROUPS");
        }
    }
}
