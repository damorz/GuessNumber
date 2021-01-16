package controller

// import (
// 	"github.com/gin-gonic/gin"
// 	"gitlab.com/pragmaticreviews/golang-gin-poc/entity"
// 	"gitlab.com/pragmaticreviews/golang-gin-poc/service"
// )

// type AnswerController interface {
// 	FindAll() []entity.Answer
// 	Save(ctx *gin.Context) entity.Answer
// }

// type controller struct {
// 	service service.AnswerService
// }

// func New(service service.AnswerService) AnswerController {
// 	return controller{
// 		service: service,
// 	}
// }

// func (c *controller) FindAll() []entity.Answer {
// 	return c.service.FindAll()
// }

// func (c *controller) Save(ctx *gin.Context) entity.Answer {
// 	var answer entity.Answer
// 	ctx.BindJSON(&answer)
// 	c.service.Save(answer)
// 	return answer
// }
