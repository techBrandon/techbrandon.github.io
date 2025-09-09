---
layout: post
title: "A Simple AD Problem"
date: 2025-09-09
categories: [Active Directory, Security, RANT]
---

## /rant on

Have you ever been asked a simple question only to find out it's not so simple after all? Maybe it's your insatiable need for a deeper answer, or perhaps you can blame it on the hacker mindset that requires you to know how stuff works, or maybe it's some undiagnosed ADHD. No matter the reason, the feeling sucks while its happening and when you finally figure out the solution, there's a mix of accomplishment and embarrassment. When it comes to working with Active Directory you can also add in the "wtf Microsoft" feeling. 

## The simple question
> How do you delegate permissions so users can add and delete computer objects from an OU? 
I don't even need AI for this one! The delegation of control wizard basically does it for you. Pick your users/groups, create a custom task to delegate, target only the computer objects (because you care about least privilege) and click both the create and delete boxes. 
Next, next, done. Right?
Well, before you can click finish you need to pick a permission set. This sent me on quite the tangent because my permissions didn't work. I couldn't delete the computer objects. Even the effective permissions on the computer object showed I did not possess delete permissions.
That's when I submitted to the AI gods and asked. They got me an answer… but not the right one. I did learn that effective permissions is a liar because the ability to delete an object is actually controlled on the parent object. That was a whole other tangent I don't want to focus on right now because I want to get to the solution. 
If you're really interested in those tangents, then go ahead and start trying to apply a delete permission in at least 4 different ways. 

## Did you check the deny permissions?
Of course I did! The only deny permission is the default ACE for "Everyone" that protects the OU from accidental deletion. That permission is only applied on the OU and applies to "this object only". But if you remember what I said about the delete control being tied to the OU and not the object then you may already have that lightbulb turning on.
I'm going to dig into the technical details in the next section so let's just wrap up this section with the answer.
When you create an OU, by default the "protect object from accidental deletion" is checked. You can also apply this protection to other AD objects such as computers themselves. The fact is, that once any object has this configured, the parent OU's deny ACE is updated from "Delete" to also include "Delete all child objects". So, the problem I was encountering actually did have everything to do with the deny permission. 

## Technical detail
When creating a new empty OU, the deny ACE on that object includes only the "Delete" and "Delete subtree" permissions. 
![Default Deny ACE](/assets/images/simple_1.png)
These permissions apply only to protect the OU itself and as a byproduct, prevent accidental deletion of all objects within that OU. However, as soon as any single object within that OU becomes protected, the ACE changes to also include the "Delete all child objects" permission. 
![Deny ACE after subOU](/assets/images/simple_2.png)
This now effectively protects all sibling objects (did I just make that up?) within the OU. 

## Future questions
This brings up the question as to why I get these types of errors as a Domain Admin when trying to delete objects specifically marked as protected.
![Delete Protected OU](/assets/images/simple_3.png)
![Delete unprotected OU with protected computer](/assets/images/simple_4.png)
But as a regular user, I get these messages when deleting a sibling object.
![Delete unprotected sibling computer](/assets/images/simple_5.png)
And as a Domain Admin, I can delete sibling objects without pause.
