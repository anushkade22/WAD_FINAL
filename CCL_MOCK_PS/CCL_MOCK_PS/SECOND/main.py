import webapp2
class MainPage(webapp2.RequestHandler) :
	def get(self):
		self.response.headers["Content-Type"]="text/plain"
		for i in range(5):
			self.response.out.write("I am Harshvardhan and My Seat Number is 33346 and I am From IT Department\n")
app=webapp2.WSGIApplication([('/',MainPage)],debug=True)
		
