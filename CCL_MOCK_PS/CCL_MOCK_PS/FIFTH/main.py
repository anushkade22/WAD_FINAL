import webapp2
class MainPage(webapp2.RequestHandler) :
	def get(self):
		self.response.headers["Content-Type"]="text/plain"
		for i in range(1,11):
			self.response.out.write("\n");
			self.response.out.write("10*");
			self.response.out.write(i);
			self.response.out.write("=");
			self.response.out.write(10*i);
			self.response.out.write("\n");
app=webapp2.WSGIApplication([('/',MainPage)],debug=True)

