const { BadRequest, NotFoundError } = require("../../../src/common/ExceptionHandler");
const TaskService = require("../../../src/business/services/task");
const taskService = new TaskService();

describe("TaskService", () => {
  describe("- SUCESS CASES -", () => {
    it("consultTask | Ensure that the task was successfully consulted", async () => {
      const taskRepositoryReturnMock = {
        id: 1,
        description: "Desenvolver API"
      };

      const createTaskRepositoryMock = () => taskRepositoryReturnMock;

      jest.spyOn(
        taskService.taskRepository,
        "consultTask")
        .mockImplementationOnce(createTaskRepositoryMock);
      const result = await taskService.consultTask();

      expect(result).toBe(taskRepositoryReturnMock);
    });

    it("insertTask | Ensure that the task was successfully inserted", async () => {
      const objectTask = {
        id: 3,
        description: "Test API"
      };

      const taskRepositoryReturnMock = {
        rowAffect: 1
      };

      const createTaskRepositoryMock = () => taskRepositoryReturnMock;

      jest.spyOn(
        taskService.taskRepository,
        "insertTask")
        .mockImplementationOnce(createTaskRepositoryMock);
      const result = await taskService.insertTask(objectTask);

      expect(result).toBe(taskRepositoryReturnMock);
    });

    it("udpateTask | Ensure that the task was successfully changed", async () => {
      const objectTask = {
        id: 3,
        description: "Test API Success"
      };

      const taskRepositoryReturnMock = {
        rowAffect: 1
      };

      const createTaskRepositoryMock = () => taskRepositoryReturnMock;

      jest.spyOn(
        taskService.taskRepository,
        "updateTask")
        .mockImplementationOnce(createTaskRepositoryMock);

      const returnTaskByIDMock = {};

      const consultTaskRepositoryByIDMock = () => returnTaskByIDMock;

      jest.spyOn(
        taskService.taskRepository,
        "consultTaskByID")
        .mockImplementationOnce(consultTaskRepositoryByIDMock);

      const result = await taskService.updateTask(objectTask);

      expect(result).toBe(taskRepositoryReturnMock);
    });

    it("completeTask | Ensure task is complete", async () => {

      const objectTask = {
        "id": 2,
        "description": "Teste de alteração API - fila",
        "complete": true,
        "completiondate" : "15/11/2021"
      }
      const returnCompleteTaskMock = {};
      const completeTaskMock = () => returnCompleteTaskMock;

      jest.spyOn(
        taskService.sendMessageBroker,
        "send")
        .mockImplementationOnce(completeTaskMock);

      const result = await taskService.completeTask(objectTask);
      console.log("teste", result);
      expect(result).toBeTruthy();

    });

    it("deleteTask | Ensure that the task was successfully deleted", async () => {
      const idTask = 3;

      const taskRepositoryReturnMock = {
        rowAffect: 1
      };

      const createTaskRepositoryMock = () => taskRepositoryReturnMock;

      jest.spyOn(
        taskService.taskRepository,
        "deleteTask")
        .mockImplementationOnce(createTaskRepositoryMock);
      const result = await taskService.deleteTask(idTask);

      expect(result).toBe(taskRepositoryReturnMock);
    });

  });
  describe("- ERROR CASES -", () => {
    it("insertTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 3
      };

      const result = await taskService.insertTask(objectTask);
      expect(result).toBe(new BadRequest("Insert Task Services | the task object is not in a correct format").message);
      expect(new BadRequest().status).toBe(400);

    });

    it("insertTask | Ensure the description length is greater than 2500", async () => {
      const objectTask = {
        id: 3,
        description: `Há pouco tempo, os ambientalistas reclamávamos da falta de espaço na mídia. Hoje o problema é inverso. Escreve-se e fala-se tanto sobre o assunto, que as pessoas nem lêem mais os artigos com a abertura "Nosso planeta passa por alterações gravíssimas, etc.". "Na era da informação, estamos todos desinformados", conforme li já onde não sei mais onde...

        Os artigos publicados neste início de ano oscilam entre duas correntes; Evaristo Miranda, da Embrapa, publicou um artigo no Estado de São Paulo, comparando quanta floresta havia há 8.000 anos, com quanta há hoje. A conclusão, é que a Europa, e não o Brasil, é a grande desmatadora, vindo de 7% para 0,1%. Este artigo ecoa o livro "Chutando a escada" de Ha-Joon Chang de Cambridge, que descreve como os países desenvolvidos, uma vez chegando lá, tentam impedir o desenvolvimento dos outros. Trocando em miúdos, parte do mundo desenvolveu-se antes, poluiu antes e agora quer dividir a poluição, mas não o desenvolvimento gerado por ela.
        
        Em uma outra corrente, Contardo Calligaris publicou na Folha de São Paulo da quinta feira, um comentário sobre a dificuldade que temos de pensar coletivamente. Ele escreve que o fundo cristão de nossa cultura reafirma nossa irmandade, mas que a salvação é decidida um a um. Agir contra o interesse do indivíduo, mas a favor do grupo não é de nosso feitio. Luis Fernando Veríssimo também escreveu uma coluna irônica no Estado de São Paulo, lembrando que somos inquilinos do planeta, e que temos obrigação de retornar o imóvel como encontramos.
        
        Para usar uma analogia ao gosto do nosso presidente, estas duas correntes de pensamento lembram o time de futebol que ao invés de jogar, preocupa-se em descobrir culpados, ou então o time que é tão altruísta que ninguém faz gol, porque sempre passa a bola para o outro fazer.
        
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        `
      };

      const result = await taskService.insertTask(objectTask);
      expect(result).toBe(new BadRequest("Insert Task Services | the description size is too big").message);
      expect(new BadRequest().status).toBe(400);

    });

    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 2
      };

      const result = await taskService.updateTask(objectTask);
      expect(result).toBe(new BadRequest("Update Task Services | the task object is not in a correct format").message);

    });

    it("updateTask | Ensure the description length is greater than 2500", async () => {
      const objectTask = {
        id: 2,
        description: `Há pouco tempo, os ambientalistas reclamávamos da falta de espaço na mídia. Hoje o problema é inverso. Escreve-se e fala-se tanto sobre o assunto, que as pessoas nem lêem mais os artigos com a abertura "Nosso planeta passa por alterações gravíssimas, etc.". "Na era da informação, estamos todos desinformados", conforme li já onde não sei mais onde...

        Os artigos publicados neste início de ano oscilam entre duas correntes; Evaristo Miranda, da Embrapa, publicou um artigo no Estado de São Paulo, comparando quanta floresta havia há 8.000 anos, com quanta há hoje. A conclusão, é que a Europa, e não o Brasil, é a grande desmatadora, vindo de 7% para 0,1%. Este artigo ecoa o livro "Chutando a escada" de Ha-Joon Chang de Cambridge, que descreve como os países desenvolvidos, uma vez chegando lá, tentam impedir o desenvolvimento dos outros. Trocando em miúdos, parte do mundo desenvolveu-se antes, poluiu antes e agora quer dividir a poluição, mas não o desenvolvimento gerado por ela.
        
        Em uma outra corrente, Contardo Calligaris publicou na Folha de São Paulo da quinta feira, um comentário sobre a dificuldade que temos de pensar coletivamente. Ele escreve que o fundo cristão de nossa cultura reafirma nossa irmandade, mas que a salvação é decidida um a um. Agir contra o interesse do indivíduo, mas a favor do grupo não é de nosso feitio. Luis Fernando Veríssimo também escreveu uma coluna irônica no Estado de São Paulo, lembrando que somos inquilinos do planeta, e que temos obrigação de retornar o imóvel como encontramos.
        
        Para usar uma analogia ao gosto do nosso presidente, estas duas correntes de pensamento lembram o time de futebol que ao invés de jogar, preocupa-se em descobrir culpados, ou então o time que é tão altruísta que ninguém faz gol, porque sempre passa a bola para o outro fazer.
        
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        `
      };

      const result = await taskService.updateTask(objectTask);
      expect(result).toBe(new BadRequest("Update Task Services | the description size is too big").message);
      expect(new BadRequest().status).toBe(400);

    });

    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 4,
        description: "Test API"
      };

      const result = await taskService.updateTask(objectTask);
      expect(result).toBe(new NotFoundError("Update Task Services | no tasks found for this id").message);
      expect(new NotFoundError().status).toBe(404);

    });


    it("completeTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 2,
        description : 'teste'
      };

      const result = await taskService.completeTask(objectTask);
      expect(result).toBe(new BadRequest("Complete Task Services | the task object is not in a correct format").message);

    });

    it("completeTask | Ensure the description length is greater than 2500", async () => {
      const objectTask = {
        id: 2,
        description: `Há pouco tempo, os ambientalistas reclamávamos da falta de espaço na mídia. Hoje o problema é inverso. Escreve-se e fala-se tanto sobre o assunto, que as pessoas nem lêem mais os artigos com a abertura "Nosso planeta passa por alterações gravíssimas, etc.". "Na era da informação, estamos todos desinformados", conforme li já onde não sei mais onde...

        Os artigos publicados neste início de ano oscilam entre duas correntes; Evaristo Miranda, da Embrapa, publicou um artigo no Estado de São Paulo, comparando quanta floresta havia há 8.000 anos, com quanta há hoje. A conclusão, é que a Europa, e não o Brasil, é a grande desmatadora, vindo de 7% para 0,1%. Este artigo ecoa o livro "Chutando a escada" de Ha-Joon Chang de Cambridge, que descreve como os países desenvolvidos, uma vez chegando lá, tentam impedir o desenvolvimento dos outros. Trocando em miúdos, parte do mundo desenvolveu-se antes, poluiu antes e agora quer dividir a poluição, mas não o desenvolvimento gerado por ela.
        
        Em uma outra corrente, Contardo Calligaris publicou na Folha de São Paulo da quinta feira, um comentário sobre a dificuldade que temos de pensar coletivamente. Ele escreve que o fundo cristão de nossa cultura reafirma nossa irmandade, mas que a salvação é decidida um a um. Agir contra o interesse do indivíduo, mas a favor do grupo não é de nosso feitio. Luis Fernando Veríssimo também escreveu uma coluna irônica no Estado de São Paulo, lembrando que somos inquilinos do planeta, e que temos obrigação de retornar o imóvel como encontramos.
        
        Para usar uma analogia ao gosto do nosso presidente, estas duas correntes de pensamento lembram o time de futebol que ao invés de jogar, preocupa-se em descobrir culpados, ou então o time que é tão altruísta que ninguém faz gol, porque sempre passa a bola para o outro fazer.
        
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        `,
        complete: true,
        completiondate: "15/11/2021"
      };

      const result = await taskService.completeTask(objectTask);
      expect(result).toBe(new BadRequest("Complete Task Services | the description size is too big").message);
      expect(new BadRequest().status).toBe(400);

    });

    it("completeTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 4,
        description: "Test API",
        complete: true,
        completiondate: "15/11/2021"
      };

      const result = await taskService.completeTask(objectTask);
      expect(result).toBe(new NotFoundError("Complete Task Services | no tasks found for this id").message);
      expect(new NotFoundError().status).toBe(404);

    });

    it("deleteTask | Ensure idtask is empty", async () => {

      const result = await taskService.deleteTask();
      expect(result).toBe(new NotFoundError("Delete Task Services | idTask value is invalid").message);
      expect(new NotFoundError().status).toBe(404);

    });

  });
});
