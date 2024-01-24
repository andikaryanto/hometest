<?php

namespace App\Http\Controllers;

use App\Models\TableReservation;
use App\Models\User;
use Codeception\Specify;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use LaravelCommon\App\Models\Scope;
use LaravelCommon\App\Models\User\Token;
use LaravelCommon\App\Queries\ScopeQuery;
use LaravelCommon\App\Services\UserService;
use LaravelCommon\Exceptions\ResponsableException;
use LaravelCommon\Responses\ResourceCreatedResponse;
use LaravelCommon\Responses\SuccessResponse;
use LaravelCommon\System\Http\Request;
use Prophecy\PhpUnit\ProphecyTrait;
use LaravelCommon\Tests\UnitTest;
use LaravelCommon\Utilities\Database\UnitOfWork;
use Symfony\Component\HttpFoundation\ParameterBag;

class UserControllerTest extends UnitTest
{
    use Specify;
    use ProphecyTrait;

    private UserController $controller;

    public function test()
    {
        $this->beforeSpecify(function () {
            $this->scopeQuery =
                $this->prophesize(ScopeQuery::class);

            $this->userService =
                $this->prophesize(UserService::class);

            $this->unitOfWork =
                $this->prophesize(UnitOfWork::class);

            $this->tableReservation = (new TableReservation())
                ->setId(1);

            $this->user = (new User())
                ->setId(1);

            $this->scope = (new Scope())
                ->setId(1);

            $this->token = (new Token())
                ->setId(1);

            $this->request = (new Request())
                ->setResource($this->user);

            $this->request->attributes = (new ParameterBag());

            $this->controller = new UserController(
                $this->scopeQuery->reveal(),
                $this->userService->reveal(),
                $this->unitOfWork->reveal()
            );
        });

        $this->describe('->store()', function () {
            $this->describe('when scopes is not set', function () {
                try {
                    $result = $this->controller->store($this->request);
                } catch (Exception $e) {
                    verify($e)->instanceOf(ResponsableException::class);
                }
            });

            $this->describe('when scopes is set but empty', function () {
                $this->request->attributes->set('scopes', []);

                try {
                    $result = $this->controller->store($this->request);
                } catch (Exception $e) {
                    verify($e)->instanceOf(ResponsableException::class);
                }
            });

            $this->describe('when post data is valid', function () {
                $this->request->attributes->set('scopes', [
                    ['id' => 1]
                ]);

                $this->scopeQuery->whereIdIn([1])
                    ->shouldBeCalled()
                    ->willReturn($this->scopeQuery);

                $this->scopeQuery->getIterator()
                    ->shouldBeCalled()
                    ->willReturn(new Collection([$this->scope]));

                $result = $this->controller->store($this->request);

                verify($result)->instanceOf(ResourceCreatedResponse::class);
            });
        });

        $this->describe('->login()', function () {
            $this->request->attributes->set('email', 'my email');
            $this->request->attributes->set('password', 'my password');

            $this->userService->generateToken('my email', 'my password')
                ->shouldBeCalled()
                ->willReturn($this->token);

            $this->unitOfWork->flush()
                ->shouldBeCalled();

            $result = $this->controller->login($this->request);
            verify($result)->instanceOf(SuccessResponse::class);
        });
    }
}
