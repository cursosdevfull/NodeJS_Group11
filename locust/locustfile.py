from locust import task, TaskSet, HttpLocust
import json

class UserBehaviour_UserA(TaskSet):
    def on_start(self):
        response = self.client.post("/auth/login", {"email": "sergio9@correo.com","password": "1234567"})
        self.token = response.json()["accessToken"]

    @task(10)
    def list_users(self):
        headers = {"Authorization": "Bearer " + self.token}
        response = self.client.get("/users", headers=headers)

    @task(2)
    def list_user_one(self):
        headers = {"Authorization": "Bearer " + self.token}
        response = self.client.get("/users/15c21712-3af2-44a4-881e-4c24c8f9fbb9", headers=headers)

class UserBehaviour_UserB(TaskSet):
    def on_start(self):
        response = self.client.post("/auth/login", {"email": "sergio9@correo.com","password": "1234567"})
        self.token = response.json()["accessToken"]

    @task(3)
    def list_users(self):
        headers = {"Authorization": "Bearer " + self.token}
        response = self.client.get("/users", headers=headers)
    @task(5)
    def list_user_one(self):
        headers = {"Authorization": "Bearer " + self.token}
        response = self.client.get("/users/15c21712-3af2-44a4-881e-4c24c8f9fbb9", headers=headers)

class Test_UserA(HttpLocust):
    task_set = UserBehaviour_UserA
    min_wait = 2000
    max_wait = 5000

class Test_UserB(HttpLocust):
    task_set = UserBehaviour_UserA
    min_wait = 3000
    max_wait = 4000    