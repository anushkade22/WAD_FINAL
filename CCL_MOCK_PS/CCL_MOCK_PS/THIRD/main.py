import webapp2
class MainPage(webapp2.RequestHandler) :
	def get(self) :
		self.response.headers["Content-Type"]="text/plain"
		for i in range(10):
			self.response.out.write("Name:Harshvardhan Nishikant Patil\n");
			self.response.out.write("Roll_No:33346\n");
			self.response.out.write("Department:Infromation Technology\n");
			self.response.out.write("\n");
app=webapp2.WSGIApplication([('/',MainPage)],debug=True)

